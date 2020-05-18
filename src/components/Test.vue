<template>
  <div>
    <VueChatEmoji :open="false"></VueChatEmoji>
  </div>
</template>

<script>
import { VueChatEmoji, emojis } from "./index";
export default {
  name: 'Test',
  components: {
    VueChatEmoji
  }
}
</script>
