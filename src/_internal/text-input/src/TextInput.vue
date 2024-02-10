<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue'
import {textInputProps, TextInputValue} from './interface.ts'
import LoadingIcon from "@/_placeholder/icons/loading.vue";

export default defineComponent({
  name: 'ATextInput',
  components: {LoadingIcon},
  props: textInputProps,
  emits: ['update:value'],
  setup(props, {emit}) {
    const number = ref<TextInputValue>(props.value)
    const attributes = computed(() => ({
      class: {invalid: props.invalid},
      style: props.theme
    }))
    const acceptNumbersOnly = () => {
      number.value = number?.value?.replace(/\D/g, '') || null
      emit('update:value', number.value)
    }

    watch(() => props.value, (value) => {
      number.value = value
    })
    return {
      number,
      attributes,
      acceptNumbersOnly
    }
  }
})
</script>

<template>
  <div class="a-tell-input" v-bind="attributes">
    <div class="a-input-wrapper">
      <div class="a-input__prefix">
        <slot name="prefix"/>
      </div>
      <div class="a-input__input">
        <input
            v-model="number"
            class="a-input__input-el"
            size="20"
            type="text"
            @input="acceptNumbersOnly"
        >
        <div class="a-input__placeholder">
          <span>{{ number && number?.trim().length ? '' : placeholder }}</span>
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
    <div class="a-input__state-border"/>
  </div>
</template>

<style lang="scss">
.a-tell-input {
  width: 100%;
  cursor: text;
  line-height: 1.5;
  z-index: auto;
  outline: none;
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  border-radius: var(--a-border-radius);
  color: var(--a-color-primary);
  background-color: white;
  transition: background-color .3s var(--a-transitions-bezier);
  --n-padding-vertical: calc((var(--a-height) - 1.5 * var(--a-text)) / 2);
  border-start-start-radius: 0 !important;
  border-end-start-radius: 0 !important;
  font-size: var(--a-text) !important;
}

.a-tell-input .a-input-wrapper {
  overflow: hidden;
  display: inline-flex;
  flex-grow: 1;
  position: relative;
  gap: 5px;
  padding-left: 10px;
  padding-right: 20px;
}

.a-tell-input .a-input__state-border {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  border-radius: inherit;
  border: var(--a-border-base);
  transition: all 0.2s var(--a-transitions-bezier)
}

.a-tell-input {
  .a-input__prefix, .a-input__suffix {
    transition: color .3s var(--a-transitions-bezier);
    flex-wrap: nowrap;
    flex-shrink: 0;
    line-height: var(--a-height);
    white-space: nowrap;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--a-color-primary);
  }

  .a-input__input {
    flex-grow: 1;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--a-color-primary);
  }

  &:focus-within {
    .a-input__placeholder {
      opacity: 0.1 !important;
    }

    .a-input__state-border {
      border: var(--a-border-focus);
    }

  }

  &:hover {
    .a-input__state-border {
      border: var(--a-border-hover);
    }
  }

  &.invalid {
    .a-input__state-border {
      border: var(--a-border-error) !important;
    }
  }
}

.a-tell-input .a-input__input-el {
  padding: 0;
  height: var(--a-height);
  line-height: var(--a-height);
  box-sizing: border-box;
  font-size: inherit;
  font-family: inherit;
  border: none;
  outline: none;
  background-color: #0000;
  text-align: inherit;
  transition: all 0.2s var(--a-transitions-bezier);
  width: 100%
}

.a-tell-input .a-input__placeholder {
  pointer-events: none;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  opacity: 0.7;
  color: var(--a-color-primary);
  font-size: var(--a-text);
  display: flex;
  align-items: center;
}

.a-tell-input .a-input__placeholder span {
  display: inline-block;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

}
</style>