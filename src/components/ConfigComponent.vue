<template>
  <div class="config-box">
    <div class="background-overlay"></div>
    <div class="configuration">
      sdfsdfsdfsdfsdfsdfsdf
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfigComponent",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
div.config-box {
  position: relative;

  div.background-overlay {
    background-color: rgba(0, 0, 0, 0.420);
    height: 100dvh;
    width: 100dvw;
    position: absolute;
    z-index: 80;
  }

  div.configuration {
    padding: 32px;
    background-color: white;
    border-radius: 32px;
    position: absolute;
    height: 400px;
    width: calc(80% - 32px);
    margin: 0 auto;
    z-index: 81;
  }
}
</style>
