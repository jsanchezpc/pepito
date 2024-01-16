<template>
  <div id="app">
    <TopNav v-if="!isMobile" :userData="userData" />
    <TopNavPortrait v-else :userData="userData" />
    <router-view />
  </div>
</template>

<script>
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
      userData: {
        name: 'Jorge',
      },
      isMobile: false
    };
  },
  mounted() {
    // Verificar el tamaño de la pantalla al cargar la página
    this.checkWindowSize();

    // Agregar un listener para verificar el tamaño de la pantalla al cambiar
    window.addEventListener('resize', this.checkWindowSize);
  },
  beforeUnmount() {
    // Limpiar el listener al destruir el componente
    window.removeEventListener('resize', this.checkWindowSize);
  },
  methods: {
    checkWindowSize() {
      // Actualizar la variable isMobile basada en el tamaño de la pantalla
      this.isMobile = window.innerWidth < 785;
    }
  }
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
