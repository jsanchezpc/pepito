<template>
  <TopNav :userData="userData" />
  <router-view />
</template>

<script>
import TopNav from '@/components/TopNav.vue';

export default {
  name: "App",
  components: {
    TopNav
  },
  data() {
    return {
      userData: {
        name: 'Jorge',
      }
    };
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
