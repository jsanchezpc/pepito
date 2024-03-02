<template>
  <nav>
    <div>
      <h1>Relleno</h1>
    </div>
    <div>
      <router-link to="/">{{ $t('components.topnav.poll') }}</router-link>
    </div>
    <!-- <div>
      <router-link to="/metrics">{{ $t('components.topnav.metrics') }}</router-link>
    </div> -->
    <div v-if="user">
      <PollBtn />
    </div>
    <div v-else>
      <router-link to="/login">
        <div class="full-btn">{{ $t('components.topnav.login_button') }}</div>
      </router-link>
    </div>
    <div @click="showConfig()" class="config">
      <img width="32" height="32" :src="configIcon" alt="config button">
    </div>

  </nav>
</template>

<script>
import configSvg from '@/assets/config.svg'
import PollBtn from "@/components/PollBtn.vue";
export default {
  name: "TopNav",
  components: {
    PollBtn
  },
  props: {
    user: Object,
  },
  data() {
    return {
      configIcon: configSvg,
      configBoo: false
    };
  },
  methods: {
    showConfig() {
      this.$emit('displayConfig')
    }
  }
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 90dvw;
  justify-content: stretch;
  height: calc(7dvh);

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
    &:last-of-type,
    &:nth-last-of-type(2) {
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
      padding: 8px;
      width: 172px;
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
