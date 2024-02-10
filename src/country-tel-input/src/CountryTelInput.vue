<script lang="ts">
import {AInputGroup, ASelectInput, ATextInput} from '@/_internal/index.ts'
import {countryTelInputProps} from './interface.ts'

import {computed, defineComponent, onMounted, reactive, ref, watch} from 'vue'
import type {CountryOption, CountryType} from "@/_utils/country.types.ts";
import useThemeTansformer from "@/composables/themeTransformer.ts";
import BaseTheme from "@/components/countryPhoneTell/data.ts";
import CountryPlaceholderData from "@/assets/countryPlaceholder.ts";
import type {SingleOption} from "@/assets/types/country.type.ts";
import parsePhoneNumber, {isPossiblePhoneNumber, isValidPhoneNumber} from "libphonenumber-js";

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

function checkRequired(country?: string , phone?: string) {
  const errorSet = new Set<string>()
  if (!country) {
    errorSet.add('Country is required')
  }
  if (!phone) {
    errorSet.add('Phone Number is required')
  }
  return {
    valid: errorSet.size === 0,
    errors: Array.from(errorSet)
  }
}

const _defaultValues = {
  modelValues: {
    country: null,
    phone: null,
    dialingNumber: null
  },
  errors: []
}
export default defineComponent({
  name: 'CountryTelInput',
  components: {AInputGroup, ASelectInput, ATextInput},
  props: countryTelInputProps,
  emits: ['update:countryValue', 'update:phoneValue', 'update:dialingValue'],
  setup(props, {emit, expose}) {
    const options = ref<CountryOption>({})
    const loading = ref({
      country: false,
      dialingCode: false,
      validatePhone: false
    })

    const modelValues = reactive({
      country: props.countryValue,
      phone: props.phoneValue,
      dialingNumber: props.dialingValue
    })
    const countryCCA = computed(() => {
      if (!modelValues?.country) return null
      return options.value[modelValues?.country]?.allData.cca3
    })

    const theme = useThemeTansformer(BaseTheme, props.size)
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

    function reset() {
      Object.assign(modelValues, _defaultValues.modelValues)
      errors.value = []
    }

    function validate() {
      // @ts-ignore
      const ALL_COUNTRY_DATA = options.value[modelValues?.country] || {}

      const CCA2 = ALL_COUNTRY_DATA?.allData?.cca2 || 'EG'
      const vModelNumber = modelValues.phone || ''

      const errorSet = new Set<string>()

      let phoneNumber = vModelNumber
      let country = null

      const {valid, errors: requiredErrors} = checkRequired(modelValues.country, modelValues.phone)

      if (!valid) {
        requiredErrors.forEach(x => errorSet.add(x))
      }

      // @ts-ignore
      const parsedNumber = parsePhoneNumber(vModelNumber, CCA2);

      if (parsedNumber) {
        phoneNumber = parsedNumber.nationalNumber
        country = parsedNumber.country
        const _isPossiblePhoneNumber = isPossiblePhoneNumber(vModelNumber, country)
        const _isValidPhoneNumber = isValidPhoneNumber(vModelNumber, country)

        if (!_isValidPhoneNumber || !_isPossiblePhoneNumber) {
          errorSet.add('Invalid Phone Number')
        }
      } else {
        errorSet.add('Invalid Phone Number')
      }

      modelValues.phone = phoneNumber ?? ''
      errors.value = Array.from(errorSet)

      return {
        valid: errorSet.size === 0,
        errors: Array.from(errorSet),
        model: {...modelValues},
        countryInfo: () => ALL_COUNTRY_DATA?.allData || {}
      }
    }

    watch(() => modelValues.country, () => emit('update:countryValue', modelValues.country))
    watch(() => modelValues.phone, () => emit('update:phoneValue', modelValues.phone))
    watch(() => modelValues.dialingNumber, () => emit('update:dialingValue', modelValues.dialingNumber))

    onMounted(async () => {
      await fetchCountries()
    })
    expose({
      reset,
      validate
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
      :label="label"
      :select-width="selectWidth"
      :show-label="showLabel"
      :show-required="showRequired"
      :theme="theme"
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
</template>

<style scoped>

</style>