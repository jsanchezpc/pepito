<template>
  <div class="overlay"></div>
  <div class="popup-container">
    <div class="share-popup">
      <h1>Share</h1>
      <div class="share-link">
        <!-- link is already generated when creating a poll -->
        <!-- <div v-if="waitAnimation" class="waiting-for">
          <LottieAnimation
            class="wait-lottie"
            :animation-data="waitIcon"
            :auto-play="true"
            :loop="true"
          />
          <h3>Generating link, please wait...</h3>
        </div> -->
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
  data() {
    return {
      waitIcon: wait2Json,
      waitAnimation: true,
    };
  },
//   components: {
//     LottieAnimation,
//   },
  mounted() {},
  methods: {
    closePopup() {
      this.$emit("closePopup");
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
      div.waiting-for {
        .wait-lottie {
          width: 10em;
          margin: 0 auto;
        }

        h3 {
          text-align: center;
          font-weight: 300;
        }
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
        &:hover {
          color: $dark;
          background-color: $dark-light;
        }
      }
    }
  }
}
</style>
