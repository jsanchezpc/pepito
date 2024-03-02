import { defineStore } from "pinia";
import axios from "axios";

export const usePollStore = defineStore("poll", {
  state: () => ({
    poll: null,
    poll_list: [],
    metricsPoll: null
  }),
  getters: {
    get_poll: (state) => state.poll,
    get_poll_list: (state) => state.poll_list,
    get_metrics_poll: (state) => state.metricsPoll,
  },
  actions: {
    update_poll(new_poll) {
      this.poll = new_poll;
    },
    remove_poll() {
      this.poll = null;
    },
    update_metricsPoll(new_metricsPoll) {
      this.metricsPoll = new_metricsPoll;
    },
    remove_metricsPoll() {
      this.poll = null;
    },
    sync_poll(token) {
      axios
        .post(`${process.env.VUE_APP_API_URL}/syncPollList`, {
          token: token,
        })
        .then((response) => {
          if (response.data.pollList && response.data.pollList.length >= 1) {
            this.poll_list = response.data.pollList;
          }
        })
        .catch((res) => console.log(res));
    },
    deleteAndUpdateList(pollId, author) {
      axios
        .post(`${process.env.VUE_APP_API_URL}/deletePoll`, {
          id: pollId,
          author: author,
          token: localStorage.getItem('token')
        })
        .then((response) => {
          console.log(response)
          if (response.data.ok) {
            this.poll_list = response.data.pollList;
          }
        })
        .catch((res) => console.log(res));
    },
  },
});
