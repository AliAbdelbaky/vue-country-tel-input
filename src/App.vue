<script lang="ts" setup>
import { ref } from 'vue'
const inputRef = ref<any>(null)
const reset = ()=>{
inputRef.value?.reset()
}
import CountryTelInput from '@/country-tel-input/src/CountryTelInput.vue'

</script>

<template>
  <div class="wrapper">
    <CountryTelInput />
    <VueCountryTelInput  ref="inputRef"/>
    <button @click="reset">Reset</button>
  </div>
</template>
<style>
body {
  background-color: #f5f5f5;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
}

.wrapper {
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 500px;
  width: 100%;

}
</style>


