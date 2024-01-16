<template>
  <nav>
    <div>
      <h1>Relleno</h1>
    </div>
    <div>
      <router-link to="/"> Encuestas </router-link>
    </div>
    <div>
      <router-link to="/answers"> Respuestas </router-link>
    </div>
    <div v-if="userData">
      <PollBtn />
    </div>
    <div v-else>
      <div class="full-btn">Registrarse</div>
    </div>
  </nav>
</template>

<script>
import PollBtn from "@/components/PollBtn.vue";
export default {
  name: "TopNav",
  components: { 
    PollBtn 
  },
  props: {
    userData: Object,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 90dvw;
  justify-content: stretch;
  div {
    display: grid;
    flex: 1;
    place-content: center;
    border: none;
    &:hover {
      border-bottom: 4px solid $primary;
      * {
        cursor: pointer;
      }
    }

    &:first-of-type,
    &:last-of-type {
      border: none;
      border-bottom: none;
    }

    h1 {
      font-weight: 900;
      cursor: pointer;
    }

    a {
      text-decoration: none;
      color: $primary;
      font-weight: 800;
    }

    div.full-btn {
      background-color: $primary;
      border-radius: 32px;
      color: $dark;
      font-weight: bold;
      padding: 16px;
      width: 255px;
      border: none;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      transition: background-color 0.4s;
      cursor: pointer;
      &:hover {
        background-color: $primary-s1;
      }
    }
  }
}
</style>
