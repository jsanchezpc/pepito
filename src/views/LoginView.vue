<template>
  <div class="login-view">
    <div class="form-box">
      <div v-if="form_state" class="login-box">
        <form>
          <h1>{{ $t('views.login_view.login.title') }}</h1>
          <div class="login-form-box">
            <label for="email-login">{{ $t('views.login_view.login.email') }}</label>
            <input v-model="logEmail" autocomplete="email" :placeholder="$t('views.login_view.login.email_placeholder')"
              required type="email" id="email-login" />

            <label for="password-login">{{ $t('views.login_view.login.password') }}</label>
            <input v-model="logPass" autocomplete="current-password"
              :placeholder="$t('views.login_view.login.password_placeholder')" required type="password"
              id="password-login" />

            <div @click="logIn()" class="full-btn">{{ $t('views.login_view.login.submit') }}</div>
            <hr />
            <p><em>{{ $t('views.login_view.login.no_account') }}</em></p>
            <div @click="switchForm()" class="outline-btn">{{ $t('views.login_view.login.create_account') }}</div>
          </div>
        </form>
      </div>
      <div v-else class="signup-box">
        <form>
          <h1>{{ $t('views.login_view.signup.title') }}</h1>
          <div class="signup-form-box">
            <label for="name-signup">{{ $t('views.login_view.signup.user') }}</label>
            <input v-model="signName" autocomplete="username" :placeholder="$t('views.login_view.signup.user_placeholder')" required type="text"
              id="name-signup" />
            <label for="email-signup">{{ $t('views.login_view.signup.email') }}</label>
            <input v-model="signEmail" autocomplete="email" :placeholder="$t('views.login_view.signup.email_placeholder')" required type="email"
              id="email-signup" />

            <label for="password-signup">{{ $t('views.login_view.signup.password') }}</label>
            <input v-model="signPass" autocomplete="new-password" :placeholder="$t('views.login_view.signup.password_placeholder')" required type="password"
              id="password-signup" />

            <p class="conditions">{{ $t('views.login_view.signup.terms_conditions') }}</p>

            <div @click="signup()" class="full-btn">{{ $t('views.login_view.signup.submit') }}</div>
            <hr />
            <p><em>{{ $t('views.login_view.signup.already_account') }}</em></p>
            <div @click="switchForm()" class="outline-btn">{{ $t('views.login_view.signup.enter') }}</div>
          </div>
        </form>
      </div>
    </div>
    <div class="side-figure">
      <h1>Relleno</h1>
      <img :src="loginIcon" alt="Welcome" />
      <h2>{{ $t('views.login_view.message') }}</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from "@/store/user-store";
import loginSvg from "@/assets/login.svg";
export default {
  name: "LoginView",
  data() {
    return {
      loginIcon: loginSvg,
      form_state: true,
      logEmail: "",
      logPass: "",
      signName: '',
      signEmail: "",
      signPass: "",
    };
  },
  mounted() {
    if (localStorage.getItem('user')) {
      this.$router.push('/')
    }
  },
  methods: {
    switchForm() {
      this.form_state = !this.form_state;
    },
    signup() {
      axios
        .post(`${process.env.VUE_APP_API_URL}/signup`, {
          username: this.signName,
          email: this.signEmail,
          password: this.signPass,
          language: this.$i18n.locale
        })
        .then((response) => {
          if (response.data.ok === true) {
            useUserStore().update_token(response.data.token);
            useUserStore().update_user(JSON.stringify(response.data.user));
            localStorage.setItem("token", useUserStore().get_token);
            localStorage.setItem("user", useUserStore().get_user);
          } else {
            console.log("OK?: ", response.data.ok);
          }
        })
        .then(() => this.$router.push("/"))
        .catch((error) => {
          console.error(error);
        });
    },
    logIn() {
      axios
        .post(`${process.env.VUE_APP_API_URL}/login`, {
          email: this.logEmail,
          password: this.logPass,
        })
        .then((response) => {
          if (response.data.ok === true) {
            useUserStore().update_token(response.data.token);
            useUserStore().update_user(JSON.stringify(response.data.user));
            localStorage.setItem("token", useUserStore().get_token);
            localStorage.setItem("user", useUserStore().get_user);
          } else {
            console.log("OK?: ", response.data.ok);
          }
        })
        .then(() => this.$router.push("/"))
        .catch((error) => {
          console.error(error);
        });
    }
  },
};
</script>

<style scoped lang="scss">
div.login-view {
  width: 100dvw;
  margin: 0 auto;
  height: 100dvh;
  display: flex;
  flex-direction: row;
  flex-flow: row-reverse;

  div.side-figure {
    flex: 1;
    display: grid;
    place-content: center;

    h1 {
      font-weight: 900;
      font-size: 3rem;
      margin-bottom: 0;
      text-align: center;
    }

    h2 {
      font-weight: 500;
      text-align: center;
    }

    img {
      width: 100%;
      margin: 0 auto;
    }
  }

  div.form-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    user-select: none;

    div.login-box,
    div.signup-box {
      flex: 1;
      display: grid;
      place-content: center;

      form {
        h1 {
          text-align: center;
        }

        div.login-form-box,
        div.signup-form-box {
          margin: 0 auto;

          label {
            margin-top: 8px;
            display: block;
            font-weight: 600;
          }

          input {
            display: block;
            height: 32px;
            outline: none;
            border-radius: 4px;
            margin-top: 4px;
            border: none;
            width: 100%;
            background-color: $dark-s1;
            font-weight: 500;
            padding-left: 4px;
            color: white;
            text-align: center;

            &:-webkit-autofill {
              -webkit-box-shadow: 0 0 0px 1000px $dark-s1 inset;
              -webkit-text-fill-color: white;
            }
          }

          div.outline-btn {
            margin-top: 8px;
            background-color: $dark;
            border-radius: 32px;
            border: 4px solid $primary;
            color: $primary;
            text-align: center;
            transition: background-color 0.2s;
            width: 100%;
            height: 32px;
            display: grid;
            place-content: center;
            font-weight: 800;

            &:hover {
              cursor: pointer;
              color: $dark;
              background-color: $primary;
            }
          }

          hr {
            border-style: solid;
            margin-top: 16px;
            margin-bottom: 16px;
          }

          p {
            text-align: center;
            cursor: pointer;
          }

          p.conditions {
            width: 150px;
            text-align: center;
            margin: 0 auto;
            margin-top: 8px;
          }

          div.full-btn {
            margin: 0 auto;
            text-align: center;
            background-color: $primary;
            border-radius: 32px;
            color: $dark;
            font-weight: bold;
            padding: 8px;
            width: 255px;
            border: none;
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            transition: background-color 0.4s;
            cursor: pointer;
            margin-top: 16px;

            &:hover {
              background-color: $primary-s1;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 785px) {
  div.login-view {
    width: 100dvw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    flex-flow: column;
    height: auto;

    div.side-figure {
      flex: 0.9;
      display: grid;
      place-content: center;
      position: relative;

      h1 {
        font-weight: 900;
        font-size: 3rem;
        margin-bottom: 0;
        text-align: center;
      }

      h2 {
        font-weight: 500;
        text-align: center;
      }

      img {
        width: 80%;
        margin: 0 auto;
      }
    }

    div.form-box {
      flex: 1.1;
      display: flex;
      flex-direction: column;
      user-select: none;

      div.login-box,
      div.signup-box {
        flex: 1;
        display: grid;
        place-content: center;

        form {
          h1 {
            text-align: center;
          }

          div.login-form-box,
          div.signup-form-box {
            margin: 0 auto;

            label {
              margin-top: 8px;
              display: block;
              font-weight: 600;
            }

            input {
              display: block;
              height: 32px;
              outline: none;
              border-radius: 4px;
              margin-top: 4px;
              border: none;
              width: 100%;
              background-color: $dark-s1;
              font-weight: 500;
              padding-left: 4px;
              color: white;
              text-align: center;
            }

            div.outline-btn {
              margin-top: 8px;
              background-color: $dark;
              border-radius: 32px;
              border: 4px solid $primary;
              color: $primary;
              text-align: center;
              transition: background-color 0.2s;
              width: 100%;
              height: 32px;
              display: grid;
              place-content: center;
              font-weight: 800;

              &:hover {
                cursor: pointer;
                color: $dark;
                background-color: $primary;
              }
            }

            hr {
              border-style: solid;
              margin-top: 16px;
              margin-bottom: 16px;
            }

            p {
              text-align: center;
              cursor: pointer;
            }

            p.conditions {
              width: 150px;
              text-align: center;
              margin: 0 auto;
              margin-top: 8px;
            }

            div.full-btn {
              margin: 0 auto;
              text-align: center;
              background-color: $primary;
              border-radius: 32px;
              color: $dark;
              font-weight: bold;
              padding: 8px;
              width: 255px;
              border: none;
              box-sizing: border-box;
              -moz-box-sizing: border-box;
              -webkit-box-sizing: border-box;
              transition: background-color 0.4s;
              cursor: pointer;
              margin-top: 16px;

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
