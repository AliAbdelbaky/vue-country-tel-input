<script lang="ts" setup>
import {computed, ref} from 'vue'

const inputRef = ref<any>(null)
const reset = () => {
  inputRef.value?.reset()
}
const validate = () => {
  console.log(inputRef.value)
  inputRef.value?.validate()
}

const country = ref<string | undefined>(undefined)
const number =ref<string | undefined>(undefined)
const dialing =ref<string | undefined>(undefined)
const loggerItems = computed(()=>({
  country: country.value,
  number: number.value,
  dialing: dialing.value
}))
</script>

<template>
  <div class="wrapper">
    <ACountryTelInput
        v-model:country-value="country"
        v-model:phone-value="number"
        v-model:dialing-value="dialing"
        ref="inputRef"
    />


    <div class="work-around">
      <div class="btn-container">
        <button @click="reset">Reset</button>
        <button @click="validate">validate</button>
      </div>
      <div class="logger-container">
        <div
            v-for="(item, key) in loggerItems"
            :key="key"
            class="item"
        >
          <span>{{key}}:</span>
          <span>{{item}}</span>
        </div>
      </div>
    </div>

  </div>
</template>
<style lang="scss">
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

.work-around{
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 0 0 0 1px #d9d9d9;
  border-radius: 5px;
  padding: 1rem;
  margin-top: 1rem;
  .btn-container{
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    button {
      padding: 10px 20px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      background-color: #1890ff;
      color: #fff;
      font-size: 16px;
      flex:1;
    }
    button:hover {
      background-color: #40a9ff;
    }
  }
  .logger-container{
    display: flex;
    flex-direction: column;
    gap: 10px;
    .item{
      display: grid;
      grid-template-columns: 110px 1fr;
      span{
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
}


</style>


