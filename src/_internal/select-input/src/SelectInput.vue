<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'ATellSelect',
  props: {
    theme: {
      type: Object,
      default: () => ({})
    },
    placeholder: {
      type: String,
      default: ''
    },
    invalid: {
      type: Boolean,
      default: false
    },
    selectedOption: {
      type: String,
      default: ''
    },
    filteredOption: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {
      searchInput: ''
    }
  },
  methods: {
    togglePopover(isOpen) {
      if (isOpen) {
        this.$refs.selectRef.focus()
      }
    },
    renderLabel(option) {
      return option?.label
    }
  }

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
    </div>
    <div class="a-base-selection__state-border"/>
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