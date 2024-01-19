<template>
  <div class="home">
    <div v-if="pollList && user && user.length > 1" class="poll-list">blabla bla</div>
    <div v-else class="no-poll">
      <h2 v-if="user"><span style="font-weight: 300;">Hola,</span> {{ user.username }}</h2>
      <img :src="draw" alt="poll draw" />
      <h1>¡Empieza creando una encuesta!</h1>
      <PollBtn />
    </div>
  </div>
</template>

<script>
import PollBtn from "@/components/PollBtn.vue";
import drawSvg from "@/assets/quest.svg";
import { useUserStore } from "@/store/user-store";
export default {
  name: "HomeView",
  components: {
    PollBtn
  },
  data() {
    return {
      draw: drawSvg,
      user: useUserStore().get_user,
      pollList: null,
    };
  },
};
</script>

<style scoped lang="scss">
div.home {
  width: 80dvw;
  margin: 0 auto;
  height: calc(100dvh - 7dvh);
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
