<script lang="ts" setup>
import {computed, defineProps} from "vue";
import type {SingleOption} from "@/_utils/country.types.ts";

const props = defineProps<{ option: SingleOption,fontSize:string }>()
const name = computed(() => props.option.allData.name.common || props.option.allData.name.official)
</script>

<template>
  <div
      class="a-opt-text-container"
  >
    {{ name }}
  </div>
</template>
<style>
.a-opt-text-container{
  font-size: var(--a-text);
  font-weight: 400;
  color: var(--a-color-primary);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 1.5;
  box-sizing: content-box;
  width: 100%;
}
</style>