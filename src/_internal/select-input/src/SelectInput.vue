<script lang="ts">
import {computed, defineComponent, h, nextTick, ref, watch} from "vue";
import {type _SingleOption, selectInputProps} from './interface.ts'

import OptionIcon from "./partials/optIcon.vue";
import OptionLabel from "./partials/optLabel.vue";

import LoadingIcon from "@/components/countryPhoneTell/partial/loadingIcon.vue";
import {createPopper} from "@popperjs/core";
import {CountryOption} from "@/_utils/country.types.ts";

import {APopover} from '@/_internal/popover'

const renderLabel = (option: _SingleOption) => {

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

export default defineComponent({
  name: 'ASelectInput',
  components: {APopover, LoadingIcon},
  props: selectInputProps,
  emits: ['update:value'],
  setup(props, {emit}) {

    const attributes = computed(() => ({
      class: {invalid: props.invalid},
      style: props.theme
    }))
    const searchInput = ref<string | null>(null)

    const selectRef = ref<HTMLElement | null>(null)
    const selectValue = ref(props.value)
    const filteredOption = ref<CountryOption>(props.options || {})

    const popoverRef = ref()
    const showPopover = ref(false)
    const popoverVars = ref({})

    const debounceTimer = ref<number | undefined>(undefined)
    const createPopover = () => {
      const ele = selectRef?.value as HTMLElement
      console.log(ele.offsetWidth)
      popoverVars.value = {
        // maxHeight,
        maxWidth: ele.offsetWidth + 'px',
      }
      createPopper(ele, popoverRef.value.$el, {placement: 'bottom'});
    }

    function togglePopover(value: boolean) {
      setTimeout(async () => {
        showPopover.value = value
        if (!showPopover.value) return
        await nextTick(() => {
          createPopover()
        })
      }, 150)
    }

    function handleUpdateValue(item: _SingleOption) {
      selectValue.value = item.value
      togglePopover(false)
      searchInput.value = null
      emit('update:value', selectValue.value)
    }

    function handleSearch(query?: string | null) {
      clearTimeout(debounceTimer.value);
      const exists = query && query.trim().length > 0
      const options = props.options || {}
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

    watch(searchInput, () => {
      togglePopover(!!searchInput.value && !!searchInput.value.trim().length)
      handleSearch(searchInput.value)
    })
    watch(() => props.options, () => {
      filteredOption.value = props.options || {}
    })
    watch(() => props.value, (value) => {
      selectValue.value = value
    })

    return {
      attributes,

      selectRef,
      selectValue,
      filteredOption,

      searchInput,
      popoverRef,
      showPopover,
      popoverVars,

      togglePopover,
      renderLabel,
      handleUpdateValue
    }
  }
})

</script>

<template>
  <div
      ref="selectRef"
      class="a-tell-select"
      v-bind="attributes"
  >
    <div class="a-base-selection-label">
      <input
          v-model="searchInput"
          class="a-base-selection-input"
          placeholder=""
          @focusin="togglePopover(true)"
          @focusout="togglePopover(false)"
      >
      <div class="a-input__placeholder">
        <div class="a-base-selection-overlay">
          <component
              :is="renderLabel(filteredOption[selectValue])"
              v-if="selectValue && !searchInput?.trim().length"
          />
          <template v-else>
            {{ selectValue || !!searchInput?.trim().length ? '' : placeholder }}
          </template>
        </div>
      </div>
      <div class="a-input__suffix">
        <div v-if="loading" aria-label="loading" class="n-base-loading n-base-suffix" role="img">
          <div class="n-base-loading__placeholder">
            <LoadingIcon/>
          </div>
        </div>
      </div>
    </div>
    <div class="a-base-selection__state-border"/>
    <teleport to="body">
      <APopover
          v-show="showPopover"
          ref="popoverRef"
          :active-value="selectValue"
          :options="filteredOption"
          :renderLabel="renderLabel"
          :style="popoverVars"
          :theme="theme"
          @update:select="handleUpdateValue"
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