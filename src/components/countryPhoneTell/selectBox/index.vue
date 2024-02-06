<script lang="ts" setup>
import popover from './popover.vue'
import {h, nextTick, ref, watch} from "vue";
import {createPopper} from "@popperjs/core";
import type {CountryOption, SingleOption} from "../../../assets/types/country.type.ts";
import OptionIcon from './optIcon.vue';
import OptionLabel from './optLabel.vue';

const props = defineProps<{
  value: string | null,
  loading?: boolean,
  placeholder: string,
  options: CountryOption,
  theme: any
  invalid: boolean
}>()
const emits = defineEmits<{
  (event: 'update:value', value: string | null): void
}>()


const searchInput = ref<null | string>('')
const selectRef = ref()
const popoverRef = ref()
const showPopover = ref(false)

const popoverVars = ref({})


const selectedOption = ref<null | string>(props.value)
const filteredOption = ref<CountryOption>(props.options)


const transformPopoverPosition = () => {
  const maxWidth = selectRef.value.offsetWidth + 'px'

  popoverVars.value = {
    // maxHeight,
    maxWidth,
  }
}
const createPopover = () => {
  transformPopoverPosition()
  createPopper(selectRef.value, popoverRef.value.$el, {
    placement: 'bottom',
  });
}
const togglePopover = async (value: boolean) => {
  setTimeout(async () => {
    showPopover.value = value
    if (!showPopover.value) return
    await nextTick(() => {
      createPopover()
    })
  }, 100)

}


const renderLabel = (option: SingleOption) => {
  const flag = h(OptionIcon, {option, width: 'var(--a-text)'})
  const text = h(OptionLabel, {option, fontSize: 'var(--a-text)'})

  const container = (...args: any) => h('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      width: '100%',
    }
  }, args)
  return container(flag, text)
}

const debounceTimer = ref<any>(null)

function handleSearch(query?: string | null) {
  clearTimeout(debounceTimer.value);
  const exists = query && query.trim().length > 0
  const options = props.options
  if (!exists) {
    filteredOption.value = options
    return
  }


  debounceTimer.value = setTimeout(() => triggerSearch(), 500);
  const triggerSearch = () => {
    const searchTextLower = query.toLowerCase().trim();
    const indexedDataset = options

    const filteredList: any = {};

    for (const key in indexedDataset) {
      if (indexedDataset.hasOwnProperty(key)) {
        const item = indexedDataset[key];
        if (key.toLowerCase().includes(searchTextLower)) {
          filteredList[key] = item;
        }
      }
    }
    filteredOption.value = filteredList
  }
}


function handleSelectOption(item: SingleOption) {
  selectedOption.value = item.value
  togglePopover(false)
  searchInput.value = null
  emits('update:value', selectedOption.value)
}


watch(searchInput, () => {
  togglePopover(!!searchInput.value && !!searchInput.value.trim().length)
  handleSearch(searchInput.value)
})
watch(() => props.options, () => {
  filteredOption.value = props.options
})
watch(() => props.value, (value) => {
  selectedOption.value = value
})
</script>

<template>
  <div
      ref="selectRef"
      :class="{invalid}"
      :style="theme"
      class="a-tell-select"
  >
    <div class="a-base-selection-label">
      <input
          v-model="searchInput"
          class="a-base-selection-input"
          placeholder=""
          tabindex="-1"
          @focusin="togglePopover(true)"
          @focusout="togglePopover(false)"
      >
      <div class="a-input__placeholder">
        <div class="a-base-selection-overlay">
          <component
              :is="renderLabel(filteredOption[selectedOption])"
              v-if="selectedOption && !searchInput?.trim().length"
          />
          <template v-else>
            {{ selectedOption || !!searchInput?.trim().length ? '' : placeholder }}
          </template>
        </div>
      </div>


      <!--        <div aria-label="loading" class="a-base-loading n-base-suffix" role="img">-->
      <!--          <div class="n-base-loading__placeholder">-->
      <!--            <div class="n-base-clear">-->
      <!--              <div class="n-base-clear__placeholder"><i class="n-base-icon n-base-suffix__arrow">-->
      <!--                <svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">-->
      <!--                  <path-->
      <!--                      d="M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8 9.79289L12.1464 5.64645C12.3417 5.45118 12.6583 5.45118 12.8536 5.64645C13.0488 5.84171 13.0488 6.15829 12.8536 6.35355L8.35355 10.8536C8.15829 11.0488 7.84171 11.0488 7.64645 10.8536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z"-->
      <!--                      fill="currentColor"></path>-->
      <!--                </svg>-->
      <!--              </i></div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
    </div>
    <div class="a-base-selection__state-border"/>
    <teleport to="body">
      <popover
          v-show="showPopover"
          ref="popoverRef"
          :active-selected="selectedOption"
          :options="filteredOption"
          :renderLabel="renderLabel"
          :styles="popoverVars"
          :theme="theme"
          @update:select="handleSelectOption"
      />
    </teleport>
  </div>
</template>

<style lang="scss" scoped>
.a-tell-select {
  &:focus-within {
    .a-base-selection-overlay {
      opacity: 0.1;
    }

    .a-base-selection__state-border {
      border: var(--a-border-focus) !important;
    }
  }

  &:hover {
    .a-base-selection__state-border {
      border: var(--a-border-hover) !important;
    }
  }

  &.invalid {
    .a-base-selection__state-border {
      border: var(--a-border-error) !important;
    }
  }

  font-size: var(--a-text) !important;
  height: var(--a-height);
  min-width: 110px;
  position: relative;
  z-index: auto;
  box-shadow: none;
  width: 100%;
  max-width: 100%;
  display: inline-block;
  vertical-align: bottom;
  line-height: 1.5;
  border-radius: var(--a-border-radius);

  .a-base-selection-label {
    display: inline-flex;
    vertical-align: bottom;
    cursor: pointer;
    outline: none;
    z-index: auto;
    box-sizing: border-box;
    position: relative;
    border-radius: inherit;
    align-items: center;
    font-size: inherit;
    height: 100%;
    width: 100%;
    color: var(--a-color-primary);
    transition: all .3s var(--a-transitions-bezier);
  }

  .a-base-selection-input {
    font-size: inherit;
    line-height: inherit;
    outline: none;
    cursor: pointer;
    box-sizing: border-box;
    border: none;
    width: 100%;
    color: var(--n-text-color);
    transition: all .3s var(--a-transitions-bezier);
    padding: var(--a-padding);
  }

  .a-input__placeholder {
    display: flex;
    align-items: center;
    white-space: nowrap;
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: var(--a-padding);
    transition: all .3s var(--a-transitions-bezier);

    .a-base-selection-overlay {
      flex-basis: 0;
      flex-grow: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}


.n-base-selection .n-base-suffix {
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
}

.n-base-loading .n-base-loading__placeholder {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}


.a-tell-select .a-base-selection {
  height: 100%;
  position: relative;
  z-index: auto;
  box-shadow: none;
  width: 100%;
  max-width: 100%;
  display: inline-block;
  vertical-align: bottom;
  border-radius: var(--a-border-radius);
  min-height: 100%;
  line-height: 1.5;
  font-size: var(--a-text);
  padding: var(--a-padding);
}


.a-tell-select .a-base-selection__state-border {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  border: var(--a-border-base);
  border-radius: inherit;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  z-index: 1;
  transition: all .3s var(--a-transitions-bezier)
}
</style>