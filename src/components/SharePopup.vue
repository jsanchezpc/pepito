<template>
  <div class="overlay"></div>
  <div class="popup-container">
    <div class="share-popup">
      <h1>Share</h1>
      <div class="share-link">
        <input @click="copyLinkToClipboard()" readonly="readonly" type="text" :value="shareLink">
        <span>Click to copy to clipboard</span>
      </div>
      <div class="close">
        <div class="close-btn" @click="closePopup()">Cerrar</div>
      </div>
    </div>
  </div>
</template>

<script>
import wait2Json from "@/assets/wait2.json";
// import { LottieAnimation } from "lottie-web-vue";
export default {
  name: "SharePopup",
  props: {
    shareLink: String
  },
  data() {
    return {
      waitIcon: wait2Json,
      waitAnimation: true,
    };
  },
  //   components: {
  //     LottieAnimation,
  //   },
  mounted() { },
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
    async copyLinkToClipboard() {
      await navigator.clipboard.writeText(this.$props.shareLink);
    },
  },
};
</script>

<style lang="scss" scoped>
div.overlay {
  background-color: rgba(0, 0, 0, 0.562);
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 4;
}

div.popup-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 8;
  display: grid;
  place-content: center;

  div.share-popup {
    h1 {
      text-align: center;
    }

    div.share-link {
      margin-bottom: 32px;

      input {
        font-size: 1.5em;
        color: $dark-light;
        padding: 16px;
        border-radius: 8px;
        border: none;
        background-color: $dark;
        text-align: left;
        background-image: url('~@/assets/copy.svg');
        background-position: calc(100% - 8px);
        background-size: 32px;
        background-repeat: no-repeat;

        &:hover {
          cursor: pointer;
        }
      }

      span {
        text-align: center;
        width: 100%;
        display: block;
        margin-top: 4px;
      }
    }

    div.close {
      text-align: center;
      font-size: 1.2em;
      font-weight: 900;
      cursor: pointer;

      div.close-btn {
        background-color: $dark;
        border-radius: 8px;
        color: $primary-light;
        transition: background-color 0.3s;
        padding: 4px;

        &:hover {
          color: $dark;
          background-color: $dark-light;
        }
      }
    }
  }
}
</style>
