// import vue
import Vue from 'vue';

// import component
import VueChatEmoji from './Emoji.vue';

const components = {
    VueChatEmoji
};

Object.keys(components).forEach(component => {
  Vue.component(component, components[component]);
});

export default components;