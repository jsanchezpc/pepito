import { defineStore } from "pinia";

export const usePollStore = defineStore('poll', {
    state: () => ({
        poll: null,
    }),
    getters: {
        get_poll: (state) => state.poll,
    },
    actions: {
        update_poll(new_poll) {
            this.poll = new_poll
        },
        remove_poll() {
            this.poll = null
        }
    }
})