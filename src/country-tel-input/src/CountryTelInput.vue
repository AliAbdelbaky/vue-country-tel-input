<script lang="ts">
import {AInputGroup, ASelectInput, ATextInput} from '@/_internal/index.ts'
import {countryTelInputProps} from './interface.ts'

import {computed, defineComponent, onMounted, reactive, ref, watch} from 'vue'
import type {CountryOption, CountryType} from "@/_utils/country.types.ts";
import useThemeTansformer from "@/composables/themeTransformer.ts";
import BaseTheme from "@/components/countryPhoneTell/data.ts";
import CountryPlaceholderData from "@/assets/countryPlaceholder.ts";
import type {SingleOption} from "@/assets/types/country.type.ts";

const filterQuery = 'fields=name,flags,postalCode,idd,ccn3,cca3,cca2'
const urls = {
  countries: `https://restcountries.com/v3.1/all?${filterQuery}`,
  dialingCode: 'https://restcountries.com/v2/alpha/'
}

function assignOption(data: CountryType[]) {
  const indexedDataset: CountryOption = {};
  data.forEach((x) => {
    const key = x.name.common.toLowerCase()
    indexedDataset[key] = {
      label: x.name.common,
      value: key,
      allData: x
    }
  })
  return indexedDataset
}


const _dummyData = {
  'egypt': {
    label: 'egypt',
    value: 'egypt',
    allData: {
      name: {
        common: 'egypt',
        official: 'egypt',
        nativeName: {
          eng: {
            official: 'جمهورية مصر العربية',
            common: 'مصر'
          }
        }
      },
      flags: {
        png: 'https://restcountries.com/data/egy.svg',
        svg: 'https://restcountries.com/data/egy.svg',
        alt: 'egypt'
      },
      postalCode: {
        format: 'NNNNN',
        regex: '^(\\d{5})$'
      },
      idd: {
        root: '+20',
        suffixes: ['0']
      },
      cca2: 'EG',
      cca3: 'EGY',
      ccn3: '818',
    }
  }
}
export default defineComponent({
  name: 'CountryTelInput',
  components: {AInputGroup, ASelectInput, ATextInput},
  props: countryTelInputProps,
  emits: ['update:countryValue', 'update:phoneValue'],
  setup(props, {emit, expose}) {
    const options = ref<CountryOption>(_dummyData)
    const loading = ref({
      country: false,
      dialingCode: false,
      validatePhone: false
    })

    const modelValues = reactive({
      country: props.countryValue,
      phone: props.phoneValue,
      dialingNumber: null as number | null
    })
    const countryCCA = computed(() => {
      if (!modelValues?.country) return null
      return options.value[modelValues?.country]?.allData.cca3
    })

    const theme = useThemeTansformer(BaseTheme, 'medium')
    const errors = ref([])

    async function fetchCountries() {
      loading.value.country = true
      try {
        const response = await fetch(urls.countries)
        const data = await response.json() as CountryType[]
        options.value = assignOption(data.length ? data : CountryPlaceholderData as CountryType[])
      } catch (e) {
        options.value = assignOption(CountryPlaceholderData as CountryType[])
      } finally {
        loading.value.country = false
      }
    }

    async function handleSelectCountry() {
      if (!modelValues?.country) return

      const country = options.value[modelValues?.country] as SingleOption

      loading.value.dialingCode = true
      try {
        const response = await fetch(urls.dialingCode + country.allData.cca3)
        const data = await response.json() as any
        modelValues.dialingNumber = data.callingCodes[0];
        loading.value.dialingCode = false
      } catch (e) {
        loading.value.dialingCode = false
      }
    }

    watch(() => modelValues.country, () => emit('update:countryValue', modelValues.country))
    watch(() => modelValues.phone, () => emit('update:phoneValue', modelValues.phone))

    onMounted(async () => {
      await fetchCountries()
    })
    return {
      loading,
      options,
      modelValues,
      theme,
      errors,
      countryCCA,
      handleSelectCountry
    }
  }
})


</script>

<template>
  <a-input-group
      :errors="errors"
      :theme="theme"
      label="hello"
  >
    <ASelectInput
        v-model:value="modelValues.country"
        :invalid="!!errors.length"
        :loading="loading.country"
        :options="options"
        :theme="theme"
        @update:value="handleSelectCountry"
    />
    <a-text-input
        v-model:value="modelValues.phone"
        :invalid="!!errors.length"
        :loading="loading.dialingCode"
        :theme="theme"
    >
      <template v-if="modelValues.dialingNumber" #prefix>
        {{ countryCCA }}: +{{ modelValues.dialingNumber }}
      </template>
    </a-text-input>
  </a-input-group>
  <pre>
{{ countryCCA }}
  {{ modelValues }}
  </pre>
</template>

<style scoped>

</style>