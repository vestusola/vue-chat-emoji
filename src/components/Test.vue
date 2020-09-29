<template>
  <div id="main-body">
    <VueChatEmoji 
      :open="open" 
      @toggle="showOrHide"
      :width="width"
      :height="height"
    >
    </VueChatEmoji>
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
      open: true,
      width: "96%",
      height: "250px"
    }
  },
  methods: {
    showOrHide() {
      this.open = !this.open;
    }
  }
}
</script>
