<template>
  <div class="config-box">
    <div @click="showConfig()" class="background-overlay"></div>
    <div class="configuration">
      <h1>{{ $t("settings.nav_settings.title") }}</h1>
      <div class="settings">
        <h3>{{ $t("settings.nav_settings.lang_conf_title") }}</h3>
        <div class="language-settings">
          <div
            v-for="flag in flags"
            :key="flag.language"
            @click="setLanguage(flag.code)"
            class="language"
          >
            <figure>
              <img :src="flag.flagIcon" alt="flag image" />
              <figcaption>{{ flag.language }}</figcaption>
            </figure>
          </div>
        </div>
        <div @click="logOut()" class="logout-settings">
          <p>{{ $t("settings.nav_settings.logout_button") }}</p>
          <img :src="logoutIcon" alt="logout" />
        </div>
        <div class="finish">
          <div @click="showConfig()" class="cancel finish-btn">
            {{ $t("settings.nav_settings.cancel_action") }}
          </div>
          <div class="apply finish-btn">
            {{ $t("settings.nav_settings.accept_action") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logoutSvg from "@/assets/logout.svg";
import spainSvg from "@/assets/spain.svg";
import franceSvg from "@/assets/france.svg";
import portugalSvg from "@/assets/portugal.svg";
import germanySvg from "@/assets/germany.svg";
import usaSvg from "@/assets/usa.svg";
import axios from "axios";
import { useUserStore } from "@/store/user-store";

export default {
  name: "ConfigComponent",
  data() {
    return {
      logoutIcon: logoutSvg,
      flags: [
        { flagIcon: spainSvg, language: "Español", code: "es-ES" },
        { flagIcon: usaSvg, language: "English", code: "en-EN" },
        { flagIcon: germanySvg, language: "Deutsch", code: "de-DE" },
        { flagIcon: portugalSvg, language: "Português", code: "pt-PT" },
        { flagIcon: franceSvg, language: "Français", code: "fr-FR" },
      ],
    };
  },
  methods: {
    showConfig() {
      this.$emit("displayConfig");
    },
    setLanguage(langCode) {
      const userId = useUserStore().get_user._id;
      axios
        .post(`${process.env.VUE_APP_API_URL}/updateLanguage`, {
          id: userId,
          newLanguageCode: langCode,
        })
        .then((response) => {
          if (response.data.ok === true) {
            useUserStore().update_user(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            this.$router.go();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    logOut() {
      this.$emit("displayConfig");
      useUserStore().remove_user();
      useUserStore().remove_token();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
div.config-box {
  position: relative;
  top: -7dvh;

  div.background-overlay {
    background-color: rgba(0, 0, 0, 0.42);
    height: 100dvh;
    width: 100dvw;
    position: absolute;
    z-index: 80;
    overflow: hidden;
  }

  div.configuration {
    padding: 16px;
    background-color: white;
    border-radius: 32px;
    position: absolute;
    height: auto;
    top: 128px;
    left: 10%;
    right: 10%;
    z-index: 81;
    display: flex;
    flex-direction: column;

    h1 {
      color: $primary;
      font-weight: 300;
      margin-bottom: 0;
    }

    div.settings {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;

      h3 {
        color: black;
        margin-bottom: 0;
      }

      div.language-settings {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        overflow-x: auto;
        flex-wrap: wrap;
        width: 100%;
        margin: 0 auto;

        &::-webkit-scrollbar {
          background-color: $dark;
          border-radius: 32px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: $primary;
          border-radius: 32px;
        }

        div.language {
          width: 32px;
          margin: 32px;

          &:first-child {
            margin-left: 64px;
          }

          &:hover {
            cursor: pointer;

            figcaption {
              color: $primary;
            }
          }

          figure {
            display: grid;
            place-content: center;

            img {
              width: 32px;
              height: 32px;
              display: block;
              image-rendering: pixelated;
              margin: 0 auto;
            }

            figcaption {
              color: black;
            }
          }
        }
      }

      div.logout-settings {
        margin-top: 8px;
        display: flex;
        place-content: center;
        font-weight: 800;
        background-color: $dark;
        width: 200px;
        margin: 0 auto;
        padding: 8px;
        border-radius: 16px;
        border: 3px solid $primary;
        height: 32px;

        &:hover {
          cursor: pointer;
        }

        p {
          display: inline;
          color: white;
          margin-right: 8px;
          line-height: 0;
        }

        img {
          width: 32px;
        }
      }

      div.finish {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 16px;

        div.finish-btn {
          flex: 0.5;
          width: 100px;
          padding: 8px;
          text-align: center;
          border-radius: calc(32px + 16px);
          cursor: pointer;

          &.cancel {
            background-color: white;
            color: $primary;

            &:hover {
              color: $dark;
              font-style: italic;
            }
          }

          &.apply {
            background-color: $primary;
            color: white;
            transition: background-color 0.4s;

            &:hover {
              background-color: $primary-s1;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 685px) {
  div.config-box {
    position: relative;
    top: -7dvh;

    div.background-overlay {
      background-color: rgba(0, 0, 0, 0.42);
      height: 100dvh;
      width: 100dvw;
      position: absolute;
      z-index: 80;
      overflow: hidden;
    }

    div.configuration {
      padding: 16px;
      background-color: white;
      border-radius: 32px;
      position: absolute;
      height: auto;
      top: 128px;
      left: 10%;
      right: 10%;
      z-index: 81;
      display: flex;
      flex-direction: column;

      h1 {
        color: $primary;
        font-weight: 300;
        margin-bottom: 0;
      }

      div.settings {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;

        h3 {
          color: black;
          margin-bottom: 0;
        }

        div.language-settings {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          flex-wrap: nowrap;
          overflow-x: scroll;
          width: 100%;
          margin-bottom: 8px;

          &::-webkit-scrollbar {
            background-color: $dark;
            border-radius: 32px;
          }

          &::-webkit-scrollbar-thumb {
            background-color: $primary;
            border-radius: 32px;
          }

          div.language {
            &:first-child {
              margin-left: 64px;
            }

            @media screen and (max-width: 670px) {
              &:first-child {
                margin-left: 128px;
              }
            }

            &:hover {
              cursor: pointer;

              figcaption {
                color: $primary;
              }
            }

            figure {
              display: grid;
              place-content: center;

              img {
                width: 32px;
                display: block;
                margin: 0 auto;
                image-rendering: pixelated;
              }

              figcaption {
                color: black;
              }
            }
          }
        }

        div.finish {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin-top: 16px;

          div.finish-btn {
            flex: 0.5;
            width: 100px;
            padding: 8px;
            text-align: center;
            border-radius: calc(32px + 16px);
            cursor: pointer;

            &.cancel {
              background-color: white;
              color: $primary;

              &:hover {
                color: $dark;
              }
            }

            &.apply {
              background-color: $primary;
              color: white;
              transition: background-color 0.4s;

              &:hover {
                background-color: $primary-s1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
