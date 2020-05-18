<template>
  <div>
    <VueChatEmoji :open="open" v-on:close="test($event)"></VueChatEmoji>
  </div>
</template>

<script>
import { VueChatEmoji, emojis } from "./index";
export default {
  name: 'Test',
  components: {
    VueChatEmoji
  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    test(args) {
      console.log(args);
      this.open = args;
    }
  },
}
</script>
