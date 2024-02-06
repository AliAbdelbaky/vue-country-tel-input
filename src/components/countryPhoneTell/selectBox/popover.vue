<script lang="ts" setup>
import type {CountryOption} from "../../../assets/types/country.type.ts"

defineProps<{
  options: CountryOption,
  styles: any,
  activeSelected: string | null,
  renderLabel: (option: any) => any
  theme: string
}>()
defineEmits<{
  (event: 'update:select', value: any): void
}>()
</script>

<template>
  <div :style="theme" class="a-popover-menu">
    <div :style="{width:styles.maxWidth,maxWidth:styles.maxWidth}" class="a-popover-menu-wrapper">
      <div
          v-for="(item,key) in options"
          :key="key"
          :class="activeSelected === item.value && 'active'"
          :data-index="item.value"
          class="a-popover-menu-wrapper-item"
          @click="$emit('update:select', item)"

      >
        <component :is="renderLabel(item)"/>
      </div>
    </div>
  </div>
</template>

<style>
.a-popover-menu {
  width: fit-content;
  z-index: 2024;
  padding: 0.2rem 0;
  height: fit-content;
  max-height: 300px;
  background: #fff;
  border-radius: var(--a-border-radius);
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, .12), 0 6px 16px 0 rgba(0, 0, 0, .08), 0 9px 28px 8px rgba(0, 0, 0, .05);
  overflow-x: hidden;
  font-weight: 600;
}

.a-popover-menu .a-popover-menu-wrapper {

  color: var(--a-color-primary);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0.2rem;
  gap: 0.1rem;
  min-height: var(--a-height);
}

.a-popover-menu .a-popover-menu-wrapper-item {
  z-index: 1;
  width: 100%;
  padding: var(--a-padding);
  border-radius: var(--a-border-radius);
  min-height: var(--a-height);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: all 0.2s var(--a-transitions-bezier);
}

.a-popover-menu .a-popover-menu-wrapper-item:hover {
  background: #b1b1b12b;
  color: var(--a-color-primary);
  cursor: pointer;
}

.a-popover-menu .a-popover-menu-wrapper-item [data-txt="true"] {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  box-sizing: content-box;
  font-size: var(--a-text);
}

.a-popover-menu .a-popover-menu-wrapper-item.active {
  background: #b1b1b12b;
  color: #fff;
}

.a-popover-menu {
  --sb-track-color: #232e3300;
  --sb-thumb-color: #cdcaca;
  --sb-size: 5px;

  scrollbar-color: var(--sb-thumb-color) var(--sb-track-color);
}

.a-popover-menu::-webkit-scrollbar {
  width: var(--sb-size);
}

.a-popover-menu::-webkit-scrollbar-track {
  background: var(--sb-track-color);
  border-radius: 2px;
}

.a-popover-menu::-webkit-scrollbar-thumb {
  background: var(--sb-thumb-color);
  border-radius: 2px;
}
</style>