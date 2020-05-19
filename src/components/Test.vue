<template>
  <div id="main-body">
    <VueChatEmoji :open="open" @toggle="showOrHide"></VueChatEmoji>
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
      open: true
    }
  },
  methods: {
    showOrHide() {
      this.open = !this.open;
    }
  }
}
</script>
