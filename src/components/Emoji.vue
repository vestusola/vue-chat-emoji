<template>
  <div id="emoji-wrapper" class="emoji-wrapper">
    <div
      :class="`composer-popover composer-emoji-popover ${isPickerEnabled ? 'active': '' }`"
      :style="{ 'background-color': backgroundColor, 'border-radius': `${radius}px`, 'color': color }"
    >
      <div class="emoji-picker">
        <input
          class="composer-popover-input"
          placeholder="Search"
          name="search"
          id="search"
          autocomplete="off"
          @input="searchEmoji"
          v-model="emojiSearch"
        />
        <div class="tone-category-group">
          <span
            v-show="showTone"
            v-for="(tone, index) in tones"
            :class="['tone-category', { active: tone.name == currentTone }]"
            :key="index"
            @click="selectedTone(tone)"
          >
            <span
              class="tone-category-item"
              style="font-size: 20px;"
              :title="tone.name"
              v-html="tone.icon"
            />
          </span>
        </div>
        <div class="composer-popover-body-container">
          <div class="composer-popover-body" ref="emoji_body">
            <div class="emoji-picker-groups">
              <div class="grid-emojis emoji-picker-group">
                <span
                  v-for="emoji in emojis"
                  :key="emoji.key"
                  :title="emoji.name"
                  class="emoji-picker-emoji"
                  @click="$emit('click', emoji)"
                >{{ emoji.emoji }}</span>
              </div>
            </div>
          </div>
          <div class="emoji-category-group">
            <div
              v-for="(category, index) in categories"
              :class="['category', { active: category.name === current }]"
              :key="index"
              @click="selected(category)"
            >
              <span
                class="emoji-category"
                style="font-size: 18px;"
                :title="category.name"
                v-html="category.icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <span class="send-button" @click="toggleEmojiPicker">
      <i class="icon-emoticon fal" v-html="`&#x${icon};`"></i>
    </span>
  </div>
</template>

<script>
import { emoji_categories, skin_tones } from "../emoji/emoji_category";
import emoji from "../emoji/index";
export default {
  props: {
    backgroundColor: {
      type: String,
      default: "#f5f5f5"
    },
    radius: {
      type: [String, Number],
      default: 8
    },
    selectedCategory: {
      type: String,
      default: "Smileys & Emotion",
      validator(prop) {
        return (
          [
            "Smileys & Emotion",
            "People & Body",
            "Animals & Nature",
            "Food & Drink",
            "Travel & Places",
            "Activities",
            "Objects",
            "Symbols",
            "Flags"
          ].filter(item => item.toLowerCase().indexOf(prop.toLowerCase()) > -1)
        );
      }
    },
    color: {
      type: String,
      default: "#000"
    },
    icon: {
      type: String,
      default: "f118"
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      categories: [],
      current: this.selectedCategory,
      currentTone: "No skin tone",
      emojis: [],
      emojiSearch: "",
      showTone: false,
      tones: [],
      isPickerEnabled: this.open
    };
  },
  methods: {
    getEmojiCategories() {
      this.categories = emoji_categories;
    },
    selected(category) {
      this.current = category.name;
      if (this.current == "People & Body") {
        this.getEmojiSkinToneCategory();
        this.showTone = true;
        this.getEmojiBySkinTonesAndCategoryName(this.currentTone, this.current);
      } else {
        this.showTone = false;
        this.getEmojiByCategoryName(this.current);
      }
    },
    selectedTone(tone) {
      this.currentTone = tone.name;
      if (this.current == "People & Body") {
        this.getEmojiBySkinTonesAndCategoryName(this.currentTone, this.current);
      } else {
        this.showTone = false;
        this.getEmojiByCategoryName(this.current);
      }
    },
    toggleEmojiPicker() {
      this.isPickerEnabled = !this.isPickerEnabled;
      this.$emit("toggle");
    },
    searchEmoji() {
      var input = this.emojiSearch;
      let el = this.$refs["emoji_body"].querySelectorAll(`.emoji-picker-emoji`);
      for (let element of el) {
        if (element.getAttribute("title").indexOf(input) < 0) {
          element.style.display = "none";
        } else {
          element.style.display = "inline-table";
        }
      }
    },
    loadEmojis() {
      this.emojis = emoji.get();
    },
    getEmojiByCategoryName(category) {
      this.emojiSearch = "";
      this.emojis = emoji.findEmojiByGroup(category);
    },
    showEmojiTones() {
      this.showTone = !this.showTone;
    },
    getEmojiBySkinTonesAndCategoryName(tone, category) {
      this.emojiSearch = "";
      this.emojis = emoji.getEmojiByCategoryAndSkinTone(tone, category);
    },
    getEmojiSkinToneCategory() {
      this.tones = skin_tones;
    },
  },
  mounted() {
    this.getEmojiCategories();
    this.getEmojiByCategoryName(this.current);
  },
  watch: {
    current() {
      this.$refs["emoji_body"].scrollTop = 0;
    },
    currentTone() {
      this.$refs["emoji_body"].scrollTop = 0;
    },
    open() {
      if (this.open == false) {
        this.isPickerEnabled = false;
      } else {
        this.isPickerEnabled = true;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
// import font-awesome
@import url("../assets/font-awesome/css/all.min.css");

body {
  height: 100vh;
}
.emoji-category {
  vertical-align: middle;
  display: inline-block;
  font-size: 24px;
}
.category {
  display: inline-flex;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;
  justify-content: space-around;
  flex-direction: row;
  margin-bottom: 15px;
  cursor: pointer;
}
.tone-category {
  display: inline-flex;
  margin-top: 5px;
  margin-bottom: 5px;
  text-align: center;
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
}
.tone-category-group {
  border-top: 1px solid #ccc;
  margin-bottom: 30px;
  height: 50px;
}
.tone-category.active {
  border-bottom: 2px solid #337ab7;
  filter: saturate(3);
  padding-bottom: 1px;
}
.tone-category-item {
  vertical-align: middle;
  display: inline-block;
  margin: 0 5px;
  cursor: pointer;
}
.category.active {
  border-bottom: 3px solid #337ab7;
  filter: saturate(3);
  padding-bottom: 1px;
}
.icon-send {
  transform: rotate(60deg);
  color: #222;
  font-size: 20px;
}
.icon-emoticon {
  color: #000;
  font-size: 24px;
  top: 50%;
  left: 50%;
}
.fixed-bottom {
  width: 100%;
  bottom: 0;
  position: fixed;
  margin-bottom: 10px;
}
span.send-button {
  outline: none;
  border: none;
  padding: 10px 0px;
  cursor: pointer;
  bottom: 0;
  position: absolute;
}
.composer-popover-input {
  font-size-adjust: none;
  font-size: 50%;
  font-style: normal;
  letter-spacing: normal;
  font-stretch: normal;
  font-variant: normal;
  font-weight: 400;
  font: normal normal 100% "intercom-font", "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  text-align: left;
  text-align-last: auto;
  text-decoration: none;
  -webkit-text-emphasis: none;
  text-emphasis: none;
  text-height: auto;
  text-indent: 0;
  text-justify: auto;
  text-outline: none;
  text-shadow: none;
  text-transform: none;
  text-wrap: normal;
  alignment-adjust: auto;
  alignment-baseline: baseline;
  -webkit-animation: none 0 ease 0 1 normal;
  animation: none 0 ease 0 1 normal;
  -webkit-animation-play-state: running;
  animation-play-state: running;
  -webkit-appearance: normal;
  -moz-appearance: normal;
  appearance: normal;
  azimuth: center;
  -webkit-backface-visibility: visible;
  backface-visibility: visible;
  background: none 0 0 auto repeat scroll padding-box transparent;
  background-color: transparent;
  -ms-filter: "progid:DXImageTransform.Microsoft.gradient(enabled=false)";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.composer-popover {
  position: absolute;
  vertical-align: middle;
  box-shadow: 0 1px 15px 1px rgba(0, 0, 0, 0.08);
  transition-duration: 200ms;
  transition-delay: 0ms;
  transform-style: flat;
  transform-origin: 50% 50% 0;
  opacity: 0;
  transition: all 0.2s linear;
  visibility: hidden;
  border: 1px solid #ccc;
  width: 96%;
  height: 250px;
  overflow-y: hidden;
  overflow-x: hidden;
}
.composer-popover.active {
  visibility: visible;
  opacity: 1;
  bottom: 70px;
  position: fixed;
}
.composer-popover-input {
  font-weight: 700;
  font-size: 14px;
  color: #777;
  padding-left: 20px;
  padding-top: 10px;
  height: 40px;
  width: 100%;
  border: none;
  outline: none;
}
.composer-popover-input::placeholder {
  color: #777;
}
.composer-popover-body {
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  padding-bottom: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 50px;
}
.composer-popover-body::-webkit-scrollbar {
  width: 4px;
}
.composer-popover-body::-webkit-scrollbar-track {
  background: #ddd;
}
.composer-popover-body::-webkit-scrollbar-thumb {
  background: #bdbdbd;
  border-radius: 4px;
}
.emoji-category-group {
  display: flex;
  justify-content: space-evenly;
  justify-items: center;
  flex-direction: row;
  width: 100%;
  height: 50px;
  vertical-align: middle;
  border-top: 2px solid #ccc;
  bottom: -10px;
  position: absolute;
  overflow-x: auto;
}
.grid-emojis {
  display: grid;
  margin: 5px 0;
  justify-items: center;
}
.emoji-picker-group {
  grid-template-columns: repeat(10, 10%);
}
@media (max-width: 767px) {
  .emoji-picker-group {
    grid-template-columns: repeat(5, 20%);
  }
  .composer-popover {
    width: 90%;
  }
}
.emoji-picker-emoji {
  padding: 5px;
  width: 24px;
  line-height: 24px;
  display: inline-table;
  text-align: center;
  cursor: pointer;
  vertical-align: middle;
  font-size: 18px;
  transition: -webkit-transform 60ms ease-out;
  transition: transform 60ms ease-out;
  transition: transform 60ms ease-out, -webkit-transform 60ms ease-out;
  transition-delay: 60ms;
  font-family: Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji,
    Segoe UI Symbol, Android Emoji, EmojiSymbols;
}
</style>