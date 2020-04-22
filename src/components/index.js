// import vue
import Vue from 'vue';

// import component
import EmojiComponent from './Emoji.vue';

const components = {
  EmojiComponent
};

Object.keys(components).forEach(component => {
  Vue.component(component, components[component]);
});

const VueChatEmoji = components;

export { default as VueChatEmoji } from "./Emoji.vue";
export { default as emojis } from "../emoji/index";