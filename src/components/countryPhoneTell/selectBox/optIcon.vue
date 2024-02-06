<script lang="ts" setup>
import {computed, defineProps} from "vue";
import type {SingleOption} from "../../../assets/types/country.type.ts";

const props = defineProps<{ option: SingleOption, width: string }>()
const allData = computed(() => props.option.allData)
const image = computed(() =>allData.value.flags.png || allData.value.flags.svg)
const name = computed(() => allData.value.name.common || allData.value.name.official)
</script>

<template>
  <div
      :style="{'--width':width}"
      class="a-flag-container"
  >
    <img
        :alt="name"
        :height="width"
        :src="image"
        :width="width"
        class="a-flag-container-image"
    />
  </div>
</template>

<style scoped>
.a-flag-container {
  max-width: var(--a-text);
  height: var(--a-text);
  width: 100%;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
}

.a-flag-container-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
  transform: scale(1.1);
}
</style>