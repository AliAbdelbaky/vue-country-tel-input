# VueCountryTelInput @beta

## Description

VueCountryTelInput is a Vue.js plugin that provides a user-friendly input component for selecting a country and entering
a telephone number. It offers built-in validation to ensure the entered phone number is valid for the selected country.

The plugin utilizes the REST Countries API to fetch country data, allowing users to easily select their country from a
dropdown list. It also leverages the libphonenumber-js library for phone number parsing and validation, ensuring that
the entered phone number adheres to the expected format for the selected country.

With VueCountryTelInput, you can enhance your Vue.js applications with a seamless and intuitive country and telephone
number input, all while ensuring the accuracy and validity of the entered phone numbers.

## Features

- Country selection: Users can easily select their country from a dropdown list.
- Phone number input: Users can input their telephone number according to the selected country's format.
- Validation: The plugin validates the entered phone number to ensure it is valid for the selected country.
- REST Countries API integration: Country data is fetched from the REST Countries API, providing accurate and up-to-date
  information.
- libphonenumber-js integration: The plugin leverages the libphonenumber-js library for phone number parsing and
  validation.
- Customization: The plugin provides various customization options, including themes, sizes, and more.
- it's typescript ready

### International Telephone Input with Vue 3.

[![npm](https://img.shields.io/badge/npm-f00?logo=npm&logoColor=wight)](https://www.npmjs.com/package/vue-tel-tel-input) [![stars](https://img.shields.io/badge/github-000?logo=github&logoColor=wight)](https://github.com/AliAbdelbaky/vue-country-tell-number)

## Documentation and Demo

[Visit the website](https://vue-tel-input.iamstevendao.com/)

## Changelog

[Go to Github Releases](https://www.npmjs.com/package/vue-country-tel-input/releases)

## Getting started

- Install the plugin:

  ```sh
  npm i vue-country-tel-input@latest
  ```

- Add the plugin into your app:

  ```javascript
  import {createApp} from 'vue'
  
  import VueCountryTelInput from 'vue-country-tel-input';
  import 'vue-country-tel-input/styles.css';

  const app = createApp(App);
  app.use(VueCountryTelInput);
  
  app.mount('#app');
  ```

  [More info on installation](#installation)

- Use the `vue-country-tel-input` component:

  ```html
  <template>
    <VueCountryTelInput />
  </template>
  ```

## Installation

### npm

```bash
  npm i vue-country-tel-input@latest
```

Install the plugin into Vue:

```javascript
  import {createApp} from 'vue'

  import VueCountryTelInput from 'vue-country-tel-input';
  import 'vue-country-tel-input/styles.css';
  
  const app = createApp(App);
  app.use(VueCountryTelInput);
  
  app.mount('#app');
```
Or use the component directly:

```vue

<template>
  <VueCountryTelInput ref="inputRef"/>
  <button @click="validatePhone">validate</button>
  <button @click="resetPhone">reset</button>
  <p>{{phone}}</p>
</template>

<script setup lang="ts">
  import {ref} from 'vue';
  // important 
  import {VueCountryTelInput} from 'vue-country-tel-input';
  import 'vue-country-tel-input/styles.css';

  interface ValidatePayload {
    valid: boolean;
    errors: string[];
    model: {
      country: string | null;
      phone: string | undefined;
      dialingNumber: number | null;
    };
    countryInfo: () => any;
  }

  const inputRef = ref<any>(null);
  const phone = ref<string>('');

  const validatePhone = () => {
    const data = inputRef.value?.validate<ValidatePayload>();
    if (!data.valid) return;
    console.log('valid', data);
    phone.value = data.model.dialingNumber + data.model.phone;
  }
  const resetPhone = () => {
    inputRef.value?.reset();
  }
</script>
```

> View all available options in [Props](https://www.npmjs.com/package/vue-country-tel-input).


| **Prop**            | **Type** | **Default** **Value** | **Accepted** **Values**                                |
|---------------------|----------|-----------------------|--------------------------------------------------------|
| **`msg`**           | String   |                       | Any string                                             |
| **`size`**          | String   | 'medium'              | 'small', 'medium', 'large'                             |
| **`label`**         | String   | **phone number**      | Any string                                             |
| **`showRequired`**  | Boolean  | false                 | true, false                                            |
| **`showLabel`**     | Boolean  | true                  | true, false                                            |
| **`themeOverride`** | Object   | null                  | [ThemeOverride](#ThemeOverride)                        |
| **`selectWidth`**   | String   | '20%'                 | Any valid CSS width value (e.g., '100px', '50%', etc.) |


# Events

> validate

```typescript
type validate = () => {
    valid: boolean;
    errors: string[];
    model: {
        country: string | null;
        phone: string | undefined;
        dialingNumber: number | null;
    };
    countryInfo: () => any;
};
type reset = () => void;
```

> reset

```typescript
type reset = () => void;
```


## ThemeOverride
```typescript

interface ThemeType {
    text: TextType;
    height: HeightType;
    padding: PaddingType;
    border: BorderType;
    color: ColorType;
    font: FontType;
    transitions: TransitionsType;
}

interface TextType {
    tiny: string;
    sm: string;
    md: string;
    lg: string;
}

interface HeightType {
    tiny: string;
    sm: string;
    md: string;
    lg: string;
}

interface PaddingType {
    tiny: string;
    sm: string;
    md: string;
    lg: string;
}

interface BorderType {
    base: string;
    active: string;
    hover: string;
    focus: string;
    error: string;
    radius: string;
}

interface ColorType {
    primary: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
    menuHover: string;
    menuActive: string;
}

interface FontType {
    other: string;
    en: string;
}

interface TransitionsType {
    base: string;
    bezier: string;
}
```
```html
<template>
  <VueCountryTelInput :themeOverride="themeOverride"/>
</template>
```


## Development

Clone the project

```bash
  git clone https://github.com/AliAbdelbaky/vue-country-tel-number
```

Go to the project directory

```bash
  cd vue-country-tel-number
```

Install dependencies

```bash
  npm install
```

_**or**_

```bash
  yarn install 
```

Start the server

```bash
  npm run dev 
```
_**or**_

```bash
  yarn run dev 
```

## License

Copyright (c) 2024 Ali Abdelbaqy.
Released under the [MIT License](https://github.com/AliAbdelbaky/vue-country-tel-number).

made with &#x2764; by [Ali Abdelbaqy](https://github.com/AliAbdelbaky).


