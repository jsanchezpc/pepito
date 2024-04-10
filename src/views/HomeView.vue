<template>
  <div class="home">
    <div v-if="pollList && pollList.length >= 1" class="poll-list">
      <div class="poll-item" v-for="poll in pollList" :key="poll._id">
        <PollItem :poll="poll" @popPoll="deletePollItem()" />
      </div>
    </div>
    <div v-else class="no-poll">
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
import PollItem from "@/components/PollItem.vue";
import drawSvg from "@/assets/quest.svg";
import axios from "axios";

export default {
  name: "HomeView",
  props: {
    user: Object,
  },
  components: {
    PollBtn,
    PollItem
  },
  data() {
    return {
      draw: drawSvg,
      pollList: [],
    };
  },
  methods: {
    // updatePoll(pollId) {
    //   this.pollList = this.pollList.map(poll => {
    //     return poll._id != pollId
    //   })
    // }
    deletePollItem(pollId) {
      this.pollList = this.pollList.filter(poll => poll._id !== pollId);
    },
  },
  mounted() {
    const token = localStorage.getItem('token')
    try {
      axios
        .post(`${process.env.VUE_APP_API_URL}/syncPollList`, {
          token: token,
        })
        .then((response) => {
          if (response.data.pollList && response.data.pollList.length >= 1) {
            this.pollList = response.data.pollList;
          }
        })
        .catch((res) => console.log(res));
    } catch (error) {
      console.log(error)
    }
  },
  beforeMount() {
    if (!this.$props.user) {
      this.$router.go("/");
    }
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

  div.poll-list {
    display: flex;
    flex-direction: column-reverse;

    div.poll-item {
      display: flex;
      flex-direction: column;
    }
  }
}

@media screen and (max-width: 785px) {
  div.home {
    width: 100dvw;
    margin: 0 auto;
    height: calc(100dvh - 7dvh);
  }
}
</style>
