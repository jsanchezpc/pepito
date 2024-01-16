<template>
  <div class="answer-view">
    <div v-if="pollList" class="answers-list">blabla bla</div>
    <div class="no-poll">
      <img :src="draw" alt="poll draw" />
      <h1>¡Empieza creando una encuesta!</h1>
      <PollBtn />
    </div>
  </div>
</template>

<script>
import PollBtn from "@/components/PollBtn.vue";
import drawSvg from "@/assets/no-ans.svg";
export default {
  name: "AnswerView",
  components: {
    PollBtn,
  },
  data() {
    return {
      draw: drawSvg,
    };
  },
};
</script>

<style scoped lang="scss">
div.answer-view {
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
      color: $primary-light;
    }
  }
}
</style>
