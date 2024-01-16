<template>
  <div class="home">
    <div v-if="pollList" class="poll-list">blabla bla</div>
    <div class="no-poll">
      <img :src="draw" alt="poll draw" />
      <h1>¡Crea una encuesta para empezar!</h1>
      <div class="full-btn"><span>Encuestar</span></div>
    </div>
  </div>
</template>

<script>
import drawSvg from "@/assets/videocall.svg";
export default {
  name: "HomeView",
  data() {
    return {
      draw: drawSvg,
    };
  },
};
</script>

<style scoped lang="scss">
div.home {
  width: 80dvw;
  margin: 0 auto;
  height: calc(100dvh - 255px);
  div.no-poll {
    position: relative;
    display: grid;
    place-content: center;
    height: 100%;
    img {
      width: 400px;
      margin: 0 auto;
    }
    h1 {
      text-align: center;
      font-weight: 300;
    }
    div.full-btn {
      margin: 0 auto;
      text-align: center;
      background-color: $primary;
      border-radius: 32px;
      color: $dark;
      font-weight: bold;
      padding: 16px;
      width: 255px;
      border: none;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      transition: background-color 0.4s;
      cursor: pointer;
      &:hover {
        background-color: $primary-s1;
      }
    }
  }
}
</style>
