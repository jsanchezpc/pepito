<template>
  <div class="config-box">
    <div @click="showConfig()" class="background-overlay">
    </div>
    <div class="configuration">
      <h1>{{ $t('settings.nav_settings.title') }}</h1>
      <div class="settings">
        <h3>{{ $t('settings.nav_settings.setting_title') }}</h3>
        <div class="language-settings">
          <div v-for="flag in flags" :key="flag.language" @click="setLanguage(flag.code)" class="language">
            <figure>
              <img :src="flag.flagIcon" alt="flag image">
              <figcaption>{{ flag.language }}</figcaption>
            </figure>
          </div>
        </div>
        <div class="finish">
          <div @click="showConfig()" class="cancel finish-btn">
            {{ $t('settings.nav_settings.cancel_action') }}
          </div>
          <div class="apply finish-btn">
            {{ $t('settings.nav_settings.accept_action') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import closeSvg from '@/assets/close.svg'
import spainSvg from '@/assets/spain.svg'
import franceSvg from '@/assets/france.svg'
import portugalSvg from '@/assets/portugal.svg'
import germanySvg from '@/assets/germany.svg'
import axios from 'axios'
import { useUserStore } from '@/store/user-store'

export default {
  name: "ConfigComponent",
  data() {
    return {
      closeIcon: closeSvg,
      flags: [
        { flagIcon: germanySvg, language: 'Alemán', code: 'de-DE' },
        { flagIcon: portugalSvg, language: 'Portugués', code: 'pt-PT' },
        { flagIcon: franceSvg, language: 'Francés', code: 'fr-FR' },
        { flagIcon: spainSvg, language: 'Español', code: 'es-ES' }
      ]
    };
  },
  methods: {
    showConfig() {
      this.$emit('displayConfig')
    },
    setLanguage(langCode) {
      const userId = useUserStore().get_user._id

      axios.post(`${process.env.VUE_APP_API_URL}/updateLanguage`, { id: userId, newLanguageCode: langCode })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
div.config-box {
  position: relative;
  top: -7dvh;

  div.background-overlay {
    background-color: rgba(0, 0, 0, 0.420);
    height: 100dvh;
    width: 100dvw;
    position: absolute;
    z-index: 80;
    overflow: hidden;
  }

  div.configuration {
    padding: 32px;
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

      h3 {
        color: black;
        margin-bottom: 0;
      }

      div.language-settings {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        flex-wrap: wrap;

        div.language {
          display: grid;
          place-content: center;

          &:hover {
            cursor: pointer;

            figcaption {
              color: $primary
            }

            ;
          }

          figure {
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
          border-radius: 32px;
          cursor: pointer;

          &.cancel {
            background-color: white;
            color: $primary;
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
</style>
