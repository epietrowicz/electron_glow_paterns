# electron-prompt

Electron helper to prompt for a value via input or select

This is an extension to electron-prompt library from https://github.com/sperrichon:

https://github.com/sperrichon/electron-prompt

This extension allow to customize a little bit more the library, and adds the multi-prompt style

## Installation

```
npm install electron-multi-prompt --save
```

## Init
in main.js file:

```js
const prompt = require('electron-multi-prompt');
```

##Usage

Refer for select prompt and single input prompt to: https://github.com/sperrichon/electron-prompt

```js
prompt(options, parentBrowserWindow).then(...).catch(...)
```

##options
```js
prompt(
  {
    title: 'Window title',
    value: 'Single input value',
    label: 'Initial label',
    disableInitialLabel: true|false/*default*/
    alwaysOnTop: true|false //allow the prompt window to stay over the main Window,
    type: 'input'/*default*/|'select'|'multi-input',
    width: 580, // window width
    height: 300, // window height
    resizable: true|false,
    buttonsStyle: {
      ok_color: '#color_code', //color for ok text button
      cancel_color: '#color_code', //color for cancel text button
      ok_bg_color: '#color_code', //color for ok button
      cancel_bg_color: '#color_code', //color for cancel button
      textes: {
        ok_text: 'text', //text for ok button
        cancel_text: 'text' //text for cancel button
      }
    },

    // input select options **NEEDED ONLY IF TYPE IS SELECT**

    selectOptions: {
        value 1: 'Display Option 1',
        value 2: 'Display Option 2',
        value 3: 'Display Option 3'
    },

    // input multi-input options **NEEDED ONLY IF TYPE IS MULTI-INPUT**

    inputArray: [
      {
        key: 'id (and if missing also label) of input',
        label: 'label',
        value: 'init value',
        attributes: { // Optionals attributes for input
          placeholder: 'placeholder',
          required: true|false, // If there is a missing required input the result will be null, the required input will be recognized from '*'
          type: 'password' | 'mail' | 'number'...,
          ...
        }
      },
      ...
    ]

  }
)
```

##Callbacks
```js
prompt(options, parentBrowserWindow)
  .then((result) => {
    if (result) {
      console.log('obtained result', result),
      /**
      IN CASE OF MULTI-INPUT THE RESULT WILL BE IN THIS FORMAT:
      elem = inputArray[i];
      {
        [elem.key]: elem.value,
        ...
      }
      **/
    } else {
      // in this case the window has been closed or the input are null
    }
  })
  .catch((error) => {
    console.log('uh-oh', error);
  })
```
# electron-multi-prompt
