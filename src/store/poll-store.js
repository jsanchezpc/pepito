import { defineStore } from "pinia";
import axios from "axios";

export const usePollStore = defineStore("poll", {
  state: () => ({
    poll: null,
    poll_list: null,
  }),
  getters: {
    get_poll: (state) => state.poll,
    get_poll_list: (state) => state.poll_list
  },
  actions: {
    update_poll(new_poll) {
      this.poll = new_poll;
    },
    remove_poll() {
      this.poll = null;
    },
    sync_poll(token) {
      const self = this;
      axios
        .post(`${process.env.VUE_APP_API_URL}/syncPollList`, {
          token: token,
        })
        .then((response) => {
          console.log(response);
          self.poll_list = response.data.pollList;
          return self.poll_list;
        })
        .catch((res) => console.log(res));
    },
  },
});
