<template>
  <div class="overlay"></div>
  <div @click="closePopup()" class="popup-container">
    <div class="popup">
      <h1>¿Seguro que quieres eliminar esta encuesta?</h1>
      <div class="options">
        <div @click="closePopup()" class="option">No</div>
        <div @click="delPoll()" class="option">Sí</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DeletePopup',
  methods: {
    delPoll() {
      this.$emit('delete')
    },
    closePopup() {
      this.$emit('closePopup')
    }
  }
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

  div.popup {
    padding: 32px;
    background-color: $dark-s2;
    border-radius: 32px;

    div.options {
      width: 100%;

      div.option {
        width: 128px;
        text-align: center;
        background-color: $dark-s1;
        font-weight: bolder;
        border-radius: 4px;
        margin: 0 auto;
        margin-top: 4px;
        padding: 4px;

        &:hover {
          cursor: pointer;
          background-color: $dark;
        }
      }
    }
  }
}

@media screen and (0 <=width <=785px) {

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
    z-index: 8;

    div.popup {
      padding: 32px;
      background-color: $dark-s2;
      border-radius: 32px 32px 0px 0px;
      bottom: 0;
      position: absolute;
      width: calc(100dvw - 64px);
      h1 {
        font-size: 1.4em;
        text-align: center;
      }

      div.options {
        width: 100%;

        div.option {
          width: 128px;
          text-align: center;
          background-color: $dark-s1;
          font-weight: bolder;
          border-radius: 4px;
          margin: 0 auto;
          margin-top: 4px;
          padding: 4px;

          &:hover {
            cursor: pointer;
            background-color: $dark;
          }
        }
      }
    }
  }
}
</style>
