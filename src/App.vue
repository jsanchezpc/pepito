<template>
  <div id="app">
    <TopNav v-if="!isMobile && isUserLoaded" :user="user" @displayConfig="showConfig()" />
    <TopNavPortrait v-else-if="isUserLoaded" :user="user" @displayConfig="showConfig()" />
    <router-view v-if="isUserLoaded || toLog" :user="user" />
  </div>
</template>

<script>
import { useUserStore } from '@/store/user-store';
import TopNav from '@/components/TopNav.vue';
import TopNavPortrait from '@/components/TopNavPortrait.vue';

export default {
  name: "App",
  components: {
    TopNav,
    TopNavPortrait
  },
  data() {
    return {
      user: null,
      isUserLoaded: false,
      toLog: false,
      isMobile: false,
      configBoo: false
    };
  },
  mounted() {
    this.checkUser();
    this.checkWindowSize();
    window.addEventListener('resize', this.checkWindowSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkWindowSize);
  },
  methods: {
    checkUser() {
      if (localStorage.getItem('user') && localStorage.getItem('token')) {
        useUserStore().findUser(JSON.parse(localStorage.getItem('user'))._id)
          .then(() => {
            this.user = useUserStore().get_user;
            this.isUserLoaded = true;
          })
          .catch(error => {
            console.error("Error finding user:", error);
            this.$router.push('/login');
            this.isUserLoaded = false;
          });
      } else {
        this.toLog = true
        this.isUserLoaded = false;
        this.$router.push('/login');
      }
    },
    checkWindowSize() {
      this.isMobile = window.innerWidth < 785;
    },
    showConfig() {
      this.configBoo = !this.configBoo
      console.log('jaja')
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/_variables.scss";

html {
  max-width: 100dvw;

  body {
    margin: 0;
    font-family: "Nunito Sans", sans-serif;

    div#app {
      background-color: $dark;
      max-height: 100dvh;
      max-width: 100dvw;
      height: 100dvh;
      width: 100dvw;
      color: $primary;
      // scroll-behavior: smooth;
    }
  }

  tldx-lmi-shadow-root {
    display: none;
  }
}
</style>
