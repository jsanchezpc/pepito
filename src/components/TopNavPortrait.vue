<template>
  <div class="portrait-menu">
    <div @click="toggleMenu()" class="menu-btn">
      <img :src="menuIcon" alt="menu button" />
    </div>
    <div v-if="showMenu" class="menu-container">
      <div class="menu-box">
        <div>
          <h1>Relleno</h1>
        </div>
        <div class="nav-el">
          <div class="nav-icon">
            <img width="32" height="32" :src="pollIcon" alt="poll button" />
          </div>
          <div class="nav-link">
            <router-link @click="toggleMenu()" to="/">Encuestas</router-link>
          </div>
        </div>
        <div class="nav-el">
          <div class="nav-icon">
            <img width="32" height="32" :src="answersIcon" alt="config button" />
          </div>
          <div class="nav-link">
            <router-link @click="toggleMenu()" to="/answers">Respuestas</router-link>
          </div>
        </div>
        <div class="nav-el config">
          <div class="nav-icon">
            <img width="32" @click="toggleMenu()" height="32" :src="configIcon" alt="config button" />
          </div>
          <div class="nav-link">
            <p @click="showConfig()">Configuración</p>
          </div>
        </div>
        <div v-if="!user || user.length <= 1">
          <router-link @click="toggleMenu()" to="/login">
            <div class="full-btn">Entrar</div>
          </router-link>
        </div>
        <div v-else>
          <PollBtn />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PollBtn from "@/components/PollBtn.vue";
import menuSvg from "@/assets/menu.svg";
import configSvg from "@/assets/config.svg";
import pollSvg from "@/assets/poll.svg";
import answersSvg from "@/assets/answers.svg";

export default {
  name: "TopNavComponent",
  props: {
    user: Object,
  },
  components: {
    PollBtn,
  },
  data() {
    return {
      menuIcon: menuSvg,
      configIcon: configSvg,
      pollIcon: pollSvg,
      answersIcon: answersSvg,
      showMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    showConfig() {
      this.showMenu = !this.showMenu;
      this.$emit("displayConfig");
    },
  },
};
</script>

<style scoped lang="scss">
div.portrait-menu {
  width: 100dvw;
  height: 7dvh;
  display: flex;
  position: relative;

  div.menu-btn {
    position: absolute;
    right: 16px;
    top: 4px;
    z-index: 1000;

    img {
      width: 64px;
    }

    &:hover {
      img {
        cursor: pointer;
      }
    }
  }

  div.menu-container {
    z-index: 999;
    width: 100dvw;
    height: 100dvh;

    div.menu-box {
      background-color: black;
      display: flex;
      flex-direction: column;
      width: 100dvw;
      height: 100dvh;
      margin: 0 auto;


      div {
        margin-top: 32px;
        max-height: 64px;
        a,
        p {

          font-size: 1.8em;
          text-decoration: none;
          color: $primary;
          font-weight: 500;
          text-align: left;
        }

        h1 {
          text-align: center;
        }
      }

      div.nav-el {
        display: flex;
        flex-direction: row;

        div.nav-icon {
          flex: 0.5;
          display: grid;
          place-content: center;
        }

        div.nav-link {
          flex: 0;
          display: grid;
          place-content: center;
        }
      }
    }
  }
}
</style>
