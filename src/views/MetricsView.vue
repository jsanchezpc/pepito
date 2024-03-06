<template>
  <div class="metrics-view">
    <div v-if="poll" class="metrics-list">
      <PollComponent :poll="poll" />
    </div>
    <div v-else class="no-poll">
      <img :src="draw" alt="poll draw" />
      <h1>{{ $t("views.metrics.no_poll_message") }}</h1>
      <PollBtn />
    </div>
  </div>
</template>

<script>
import PollBtn from "@/components/PollBtn.vue";
import PollComponent from "@/components/PollComponent.vue"
import drawSvg from "@/assets/no-ans.svg";
import { usePollStore } from "@/store/poll-store";
export default {
  name: "MetricsView",
  components: {
    PollBtn,
    PollComponent
  },
  data() {
    return {
      draw: drawSvg,
      poll: usePollStore().get_metrics_poll
    };
  }

};
</script>

<style scoped lang="scss">
div.metrics-view {
  width: 80dvw;
  margin: 0 auto;
  height: auto;


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
