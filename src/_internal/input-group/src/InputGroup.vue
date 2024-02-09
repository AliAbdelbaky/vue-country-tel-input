<script lang="ts">
import {computed, defineComponent} from 'vue'
import {inputGroupProps} from './interface.ts'

export default defineComponent({
  name: 'AInputGroup',
  props: inputGroupProps,
  setup(props) {
    const attributes = computed(() => ({
      style: [props.theme,{'--select-w':props.selectWidth}]
    }))
    return {
      attributes
    }
  }
})

</script>

<template>
  <div class="a--tell-input-wrapper-form" v-bind="attributes">
    <label
        v-if="showLabel"
        class="a-form-item-label"
    >
      <span class="a-form-item-label__text">{{ label }}</span>
      <span v-if="showRequired" class="a-form-item-label__asterisk">*</span>
    </label>
    <div class="a-input-group">
      <slot/>
    </div>
    <div class="a-form-item-feedback-wrapper">
      <div class="a-form-item-feedback">
        <div
            :class="errors.length && 'active'"
            class="a-form-item-feedback__line"
        >
          {{ errors[0] }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.a-input-group {
  display: inline-flex;
  width: 100%;
  flex-wrap: nowrap;
  vertical-align: bottom;
}

.a-input-group > *:not(:last-child) {
  width: var(--select-w);
}


.a--tell-input-wrapper-form {
  display: grid;
  grid-template-areas:"label""blank""feedback";
  grid-template-rows: minmax(26px, auto) 1fr;
  grid-template-columns: minmax(0, 100%);
}

.a--tell-input-wrapper-form .a-form-item-label {
  grid-area: label;
  display: flex;
  align-items: center;
  line-height: 1.25;
  text-align: start;
  font-size: var(--a-text);
  min-height: var(--n-label-height);
  color: var(--a-color-primary);
  transition: color .3s var(--a-transitions-bezier);
  box-sizing: border-box;
}

.a--tell-input-wrapper-form .a-form-item-label .a-form-item-label__asterisk {
  display: inline-block;
  margin-left: 0.25rem;
  line-height: 1.5;
  font-size: var(--a-text);
  font-weight: 600;
  color: #d03050;
}

.a--tell-input-wrapper-form .a-form-item-feedback-wrapper {
  grid-area: feedback;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: var(--n-label-height);
  margin-top: 0.25rem;
  font-size: var(--a-text);
  color: #d03050;
  transition: color .3s var(--a-transitions-bezier);
  box-sizing: border-box;
  padding-inline-start: 0.2rem;
  font-weight: 400;
}

.a--tell-input-wrapper-form .a-form-item-feedback-wrapper .a-form-item-feedback__line {
  line-height: 1.25;
  opacity: 0;
  transition: all .3s var(--a-transitions-bezier);
  transform: translateY(-4px);
  font-size: var(--a-text);
}

.a--tell-input-wrapper-form .a-form-item-feedback-wrapper .a-form-item-feedback__line.active {
  transform: translateY(0px);
  opacity: 1;
}
</style>