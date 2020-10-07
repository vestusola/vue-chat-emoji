# Vue Chat Emoji
[![npm (scoped)](https://img.shields.io/npm/v/vue-chat-emoji.svg)](https://www.npmjs.com/package/vue-chat-emoji)
[![npm (scoped)](https://img.shields.io/badge/npm-vue--chat--emoji-brightgreen.svg)](https://www.npmjs.com/package/vue-chat-emoji)
```
A simple chat emoji for vuejs
```
![Emoji Picker](public/demo.jpg?raw=true "Emoji Picker")

## Installation
```
npm install vue-chat-emoji
```

## Usage
using inside component
```vue
<template>
  <div id="app">
    <Emoji />
  </div>
</template>

<script>
import { VueChatEmoji, emojis } from 'vue-chat-emoji'
require("vue-chat-emoji/dist/vue-chat-emoji.css");
export default {
  components: {
    Emoji: VueChatEmoji
  }
}
</script>
```
using globally
```js
import Vue from "vue";
import App from "./App.vue";
 
import { VueChatEmoji } from 'vue-chat-emoji';
Vue.component("Emoji", VueChatEmoji);
require("vue-chat-emoji/dist/vue-chat-emoji.min.css");

Vue.config.productionTip = false;
Vue.use(Emoji);
 
new Vue({
  render: h => h(App)
}).$mount("#app");
```

#### Events
Name | Description
--- | ---
`click` | Emitted when emoji is clicked. 
```vue
<template>
  <div id="app">
    <Emoji @click="selectedEmoji"/>
  </div>
</template>

<script>
import { VueChatEmoji, emojis } from 'vue-chat-emoji'
export default {
  components: {
    Emoji: VueChatEmoji
  },
  methods: {
    selectedEmoji(args) {
      console.log(args); /* return {...}*/
    }
  }
}
</script>
```
#### Methods
```
List of methods in emojis
```
Usage | Description
--- | ---
`get()` | List all emojis. Return [{...}]. 
`all()` | List all emojis. Return [{...}]
`encodeEmoji()` | Convert emoji character to string. e.g ":birthday_cake:" => "🎂" 
`decodeEmoji()` | Convert valid emoji key to character. e.g "🎂" => ":birthday_cake:"
`getRandomEmoji()` | Return random emoji. Return {...}
`findEmojiByKey()` | Return {...} if found and undefined if not found.
`findEmojiByName()` | Return {...} if found and undefined if not found.
`searchEmojiByName()` | Return [{...}] if found and [] if search not found.
`findEmojiByGroup()` | Return [{...}] if found and [] if search not found.

```vue
<template>
  <div id="app">
    <Emoji />
  </div>
</template>

<script>
import { VueChatEmoji, emojis } from 'vue-chat-emoji'
export default {
  components: {
    Emoji: VueChatEmoji
  },
  methods: {
    getAllEmojis() {
      console.log(emojis.all()); // [{...}]
      this.emojifyString("Here is your 🎂.") /* => Here is your :birthday_cake:.*/
      this.unEmojifyString("Here is your :birthday_cake:.") /* Here is your 🎂.*/
    },
    unEmojifyString(str) {
      console.log(emojis.decodeEmoji(str)) 
    },
    emojifyString(str) {
      console.log(emojis.encodeEmoji(str));
    }
  },
  mounted() {
    this.getAllEmojis();
  }
}
</script>
```

## Props
Name | Type | Description
--- | --- | ---
`backgroundColor` | `String` | (Style property) set the emoji container background color. Default: #f5f5f5 or whitesmoke
`radius` | `String` or `Number` | (Style property) Set the emoji container border radius. Default: 8
`selectedCategory` | `String` | Set default emoji category. Default: "Smileys & Emotion"
`color` | `String` | Set emoji container color. Default: "#000"
`icon` | `String` | Set emoji icon. Default: "fa fa-smile"
`open` | `Boolean` | Hide or show emoji container. Default: false
`toggle` | `Event` | To hide or show emoji container
`width` | `String` | Set emoji container width. Default: 96%
`height` | `String` | Set emoji container height. Default: 250px
`searchLabel` | `String` | Set search input field placeholer. Default: "Search"


## Using without NPM
```html
  <!DOCTYPE html>
  <!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
  <!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
  <!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
  <!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Vue Starter</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" integrity="sha512-L7MWcK7FNPcwNqnLdZq86lTHYLdQqZaz5YcAgE+5cnGmlw8JT03QB2+oxL100UeB6RlzZLUxCGSS4/++mNZdxw==" crossorigin="anonymous" />
      <link rel="stylesheet" href="https://unpkg.com/vue-chat-emoji@1.1.25/dist/vue-chat-emoji.min.css">
    </head>
    <body>
      <!--[if lt IE 7]>
        <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
      <![endif]-->
      <div id="app">
        <Emoji />
      </div>

      <script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
      <script src="https://unpkg.com/vue-chat-emoji@version/dist/vue-chat-emoji.min.js"></script>
      <script>
        new Vue({
          el: "#app",
          components: { Emoji: VueChatEmoji.VueChatEmoji },
          created() {
            
          }
        })
      </script>
    </body>
  </html>
```
