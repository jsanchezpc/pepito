<template>
  <div class="home">
    <div v-if="pollList != null && pollList.length >= 1" class="poll-list">
      <h1>{{ $t("views.home.title") }}</h1>
    </div>
    <div v-else class="no-poll">
      <h2 v-if="user"><span style="font-weight: 300;">{{ $t("views.home.greetings_message") }},</span> {{ user.username }}</h2>
      <img :src="draw" alt="poll draw" />
      <h1>{{ $t("views.home.no_poll_message") }}</h1>
      <PollBtn />
    </div>
    <div v-if="!user">
      {{ $t("views.home.account_not_found") }}
    </div>
  </div>
</template>


<script>
import PollBtn from "@/components/PollBtn.vue";
import drawSvg from "@/assets/quest.svg";
// import { useUserStore } from "@/store/user-store";
export default {
  name: "HomeView",
  props: {
    user: Object
  },
  components: {
    PollBtn
  },
  data() {
    return {
      draw: drawSvg,
      pollList: null,
    };
  },
  beforeMount() {
    if (this.$props.user < 1) {
      this.$router.go('/')
    }
  }
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
