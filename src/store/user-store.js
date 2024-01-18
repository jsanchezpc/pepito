import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        user:  {username: 'Jorge', email: "admin@admin.es"},
        token: "hola" 
    }),
    getters: {
        get_user: (state) => state.user,
        get_token: (state) => state.token
    },
    actions: {
        update_user(new_user) {
            // this.remove_token()
            this.user = new_user
        },
        update_token(new_token) {
            this.token = new_token
        },
        remove_token() {
            this.token = null
        }
    }
})