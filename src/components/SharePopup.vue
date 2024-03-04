<template>
  <div class="overlay"></div>
  <div class="popup-container">
    <div class="share-popup">
      <h1>Share</h1>
      <div class="close">
        <div class="close-btn" @click="closePopup()">Cerrar</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SharePopup",
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
    div.close {
      text-align: center;
      font-size: 1.2em;
      font-weight: 900;
      cursor: pointer;

      div.close-btn {
        background-color: $dark;
        border-radius: 8px;
        color: $primary-light;
        &:hover {
          background-color: $dark-light;
        }
      }
    }
  }
}
</style>
