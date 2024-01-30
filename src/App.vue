<template>
  <div id="app">
    <TopNav
      v-if="!isMobile && isUserLoaded"
      :user="user"
      @displayConfig="showConfig()"
    />
    <TopNavPortrait
      v-else-if="isUserLoaded"
      :user="user"
      @displayConfig="showConfig()"
    />
    <ConfigComponent v-if="configBoo" @displayConfig="showConfig()" />
    <router-view v-if="isUserLoaded || toLog" :user="user" />
  </div>
</template>

<script>
import { useUserStore } from "@/store/user-store";
import TopNav from "@/components/TopNav.vue";
import TopNavPortrait from "@/components/TopNavPortrait.vue";
import ConfigComponent from "@/components/ConfigComponent.vue";

export default {
  name: "App",
  components: {
    TopNav,
    TopNavPortrait,
    ConfigComponent,
  },
  data() {
    return {
      user: null,
      isUserLoaded: false,
      toLog: false,
      isMobile: false,
      configBoo: false,
    };
  },
  mounted() {
    this.checkUser();
    this.checkWindowSize();
    window.addEventListener("resize", this.checkWindowSize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkWindowSize);
  },
  methods: {
    checkUser() {
      if (localStorage.getItem("user") && localStorage.getItem("token")) {
        useUserStore()
          .findUser(JSON.parse(localStorage.getItem("user"))._id)
          .then(() => {
            this.user = useUserStore().get_user;
            this.isUserLoaded = true;
          })
          .catch((error) => {
            console.error("Error finding user:", error);
            localStorage.clear();
            this.isUserLoaded = false;
            this.$router.push("/login");
          });
      } else {
        this.toLog = true;
        this.isUserLoaded = false;
        localStorage.clear();
        this.$router.push("/login");
      }
    },
    checkWindowSize() {
      this.isMobile = window.innerWidth < 785;
    },
    showConfig() {
      this.configBoo = !this.configBoo;
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/_variables.scss";

html {
  body {
    margin: 0;
    font-family: "Nunito Sans", sans-serif;

    div#app {
      background-color: $dark;
      height: -webkit-fill-available;
      width: -webkit-fill-available;
      color: $primary;
      max-height: max-content;
      // position: fixed;
      // scroll-behavior: smooth;
    }
  }

  tldx-lmi-shadow-root {
    display: none;
  }
}

@media screen and (max-height: 785px) {
  html {
    body {
      margin: 0;
      font-family: "Nunito Sans", sans-serif;

      div#app {
        background-color: $dark;
        height: auto;
        width: 100dvw;
        color: $primary;
        // position: fixed;
        // scroll-behavior: smooth;
      }
    }

    tldx-lmi-shadow-root {
      display: none;
    }
  }
}
</style>
