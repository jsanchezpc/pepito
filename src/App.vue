<template>
  <div id="app">
    <TopNav v-if="!isMobile" :user="user" @displayConfig="showConfig()"  />
    <TopNavPortrait v-else :user="user" @displayConfig="showConfig()" />
    <router-view />
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
      user: '',
      isMobile: false,
      configBoo: false
    };
  },
  mounted() {
    this.loadUser();
    this.checkWindowSize();
    window.addEventListener('resize', this.checkWindowSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkWindowSize);
  },
  methods: {
    loadUser() {
      return this.user = useUserStore().get_user
    },
    checkWindowSize() {
      this.isMobile = window.innerWidth < 785;
    },
    showConfig() {
      console.log('ajsdjasdjasjdjasd')
      this.configBoo = !this.configBoo
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/_variables.scss";

html {
  max-width: 100dvw;
  overflow: hidden;
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
}
</style>
