<script lang="ts" setup>
import {AInputGroup} from '@/_internal/input-group'
import {ATextInput} from "@/_internal/text-input";

import {ref} from 'vue'
import useThemeTansformer from "@/composables/themeTransformer.ts";
import BaseTheme from "@/components/countryPhoneTell/data.ts";

const vayue = ref('')

const theme = useThemeTansformer(BaseTheme, 'medium')
</script>

<template>
  <a-input-group
      label="hello"
      :theme="theme"
  >
    <ATextInput
        v-model:value="vayue"
        :loading="true"
        :theme="theme"
    />
  </a-input-group>
  {{ vayue }}
</template>

<style scoped>

</style>