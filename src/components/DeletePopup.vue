<template>
  <div class="overlay"></div>
  <div class="popup-container">
    <div class="popup">
        <h1>¿Seguro que quieres eliminar esta encuesta?</h1>
        <div class="options">
            <div class="option">No</div>
            <div class="option">Sí</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'DeletePopup',
    methods: {

    }
};
</script>

<style lang="scss" scoped>
div.overlay {
  background-color: rgba(0, 0, 0, 0.33);
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
    background-color: white;
    div.options {

    }
  }
}
</style>
