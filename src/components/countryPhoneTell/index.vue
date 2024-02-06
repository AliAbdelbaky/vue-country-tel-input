<script lang="ts" setup>
import {computed, onMounted, ref, watch} from "vue";

// @ts-ignore
import CountryPlaceholderData from "@/assets/countryPlaceholder.js";
import SelectBox from "./selectBox/index.vue";
import AInput from "./AInput.vue";
import useThemeTansformer from '../../composables/themeTransformer.ts'

// @ts-ignore
import type {CountryOption, CountryType, SingleOption} from "@/assets/types/country.type.js";
// @ts-ignore
import {type IProps} from '../../assets/props.type.ts'
import BaseTheme from './data.ts'

import parsePhoneNumber, {isPossiblePhoneNumber, isValidPhoneNumber} from 'libphonenumber-js'


const filterQuery = 'fields=name,flags,postalCode,idd,ccn3,cca3,cca2'

const urls = {
  countries: `https://restcountries.com/v3.1/all?${filterQuery}`,
  dialingCode: 'https://restcountries.com/v2/alpha/'
}


const props = withDefaults(defineProps<IProps>(), {
  msg: 'default message from component',
  size: 'medium',
  label: 'Phone Number',
  showRequired: true,
  showLabel: true,
  themeOverride: undefined,
  selectWidth: '20%'
})

function mergeThemes(baseTheme: any, themeOverride: any): any {
  const mergedTheme = {...baseTheme};

  for (const key in themeOverride) {
    if (themeOverride.hasOwnProperty(key) && mergedTheme.hasOwnProperty(key)) {
      if (typeof themeOverride[key] === 'object' && typeof mergedTheme[key] === 'object') {
        mergedTheme[key] = {...mergedTheme[key], ...themeOverride[key]};
      } else {
        mergedTheme[key] = themeOverride[key];
      }
    }
  }

  return mergedTheme;
}

const _theme = ref<string | null>(null)


const loading = ref({
  country: false,
  dialingCode: false,
  validatePhone: false
})
const options = ref<CountryOption>({})

const modelValues = ref({
  country: null as string | null,
  phone: undefined as undefined | string,
  dialingNumber: null as number | null
})
const phoneError = ref<string[]>([])
const countryCCA = computed(() => {
  if (!modelValues.value?.country) return null
  return options.value[modelValues.value?.country]?.allData.cca3
})

const assignOptions = (data: CountryType[]) => {
  const indexedDataset: CountryOption = {};
  data.forEach((x) => {
    const key = x.name.common.toLowerCase()
    indexedDataset[key] = {
      label: x.name.common,
      value: key,
      allData: x
    }
  })
  options.value = indexedDataset
}

async function handleSelectCountry() {
  if (!modelValues.value?.country) return

  const country = options.value[modelValues.value?.country] as SingleOption

  loading.value.dialingCode = true
  try {
    const response = await fetch(urls.dialingCode + country.allData.cca3)
    const data = await response.json() as any
    modelValues.value.dialingNumber = data.callingCodes[0];
    loading.value.dialingCode = false
  } catch (e) {
    loading.value.dialingCode = false
  }
}

async function fetchCountries() {
  loading.value.country = true
  try {
    const response = await fetch(urls.countries)
    const data = await response.json() as CountryType[]
    assignOptions(data.length ? data : CountryPlaceholderData as CountryType[])
  } catch (e) {
    assignOptions(CountryPlaceholderData as CountryType[])
  } finally {
    loading.value.country = false
  }
}

const checkRequired = () => {
  const errorSet = new Set<string>()
  if (!modelValues.value.country) {
    errorSet.add('Country is required')
  }
  if (!modelValues.value.phone) {
    errorSet.add('Phone Number is required')
  }
  return {
    valid: errorSet.size === 0,
    errors: Array.from(errorSet)
  }
}

function validate() {
  // @ts-ignore
  const ALL_COUNTRY_DATA = options.value[modelValues.value?.country] || {}

  const CCA2 = ALL_COUNTRY_DATA?.allData?.cca2 || 'EG'
  const vModelNumber = modelValues.value.phone || ''

  const errorSet = new Set<string>()

  let phoneNumber = vModelNumber
  let country = null

  const {valid, errors: requiredErrors} = checkRequired()

  if (!valid) {
    requiredErrors.forEach(x => errorSet.add(x))
  }


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

  modelValues.value.phone = phoneNumber ?? ''
  phoneError.value = Array.from(errorSet)

  return {
    valid: errorSet.size === 0,
    errors: Array.from(errorSet),
    model: {...modelValues.value},
    countryInfo: () => ALL_COUNTRY_DATA?.allData || {}
  }
}
function reset(){
  modelValues.value = {
    country: null,
    phone: undefined,
    dialingNumber: null
  }
  phoneError.value = []
}


watch(() => props.themeOverride, (_) => {
  _theme.value = useThemeTansformer(mergeThemes(BaseTheme, props.themeOverride), props.size)
})

onMounted(() => {
  _theme.value = useThemeTansformer(mergeThemes(BaseTheme, props.themeOverride), props.size)
  fetchCountries()
})
defineExpose({
  validate,
  reset
})
</script>

<template>
  <div :style="[_theme,{'--select-w':selectWidth}]" class="a--tell-input-wrapper-form">
    <label
        v-if="showLabel"
        class="a-form-item-label"
    >
      <span class="a-form-item-label__text">{{ label }}</span>
      <span v-if="showRequired" class="a-form-item-label__asterisk">*</span>
    </label>
    <div class="a-input-group">
      <SelectBox
          v-model:value="modelValues.country"
          :invalid="!!phoneError.length"
          :loading="loading.country"
          :options="options"
          :theme="_theme"
          placeholder="Country"
          @update:value="handleSelectCountry"
      />
      <AInput
          v-model:value="modelValues.phone"
          :invalid="!!phoneError.length"
          :loading="loading.dialingCode"
          :theme="_theme"
          placeholder="type your phone number"
      >
        <template v-if="modelValues.dialingNumber" #prefix>
          {{ countryCCA }}: +{{ modelValues.dialingNumber }}
        </template>
      </AInput>
    </div>
    <div class="a-form-item-feedback-wrapper">
      <div class="a-form-item-feedback">
        <div
            :class="phoneError.length && 'active'"
            class="a-form-item-feedback__line"
        >
          {{ phoneError[0] }}
        </div>
      </div>
    </div>
  </div>
  <!--  // validate button-->
  <!--  <button @click="outValidate">Validate</button>-->
  <!--  <pre style="margin-top: 2rem">-->
  <!--    {{ _theme }}-->
  <!--  </pre>-->
</template>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

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