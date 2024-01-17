<template>
    <div class="login-view">
        <div class="form-box">
            <div v-if="form_state" class="login-box">
                <form>
                    <h1>Entrar</h1>
                    <div class="login-form-box">
                        <label for="email-login">Email</label>
                        <input placeholder="Correo" required type="email" id="email-login">

                        <label for="password-login">Contraseña</label>
                        <input placeholder="Contraseña" required type="password" id="password-login">

                        <div class="full-btn">Entrar</div>
                        <hr>
                        <p>¿Aun no tienes cuenta?</p>
                        <div @click="switchForm()" class="outline-btn">
                            Crear cuenta
                        </div>
                    </div>
                </form>
            </div>
            <div v-else class="signup-box">
                <form>
                    <h1>Crear cuenta</h1>
                    <div class="signup-form-box">
                        <label for="email-signup">Email</label>
                        <input placeholder="Correo" required type="email" id="email-signup">

                        <label for="password-signup">Contraseña</label>
                        <input placeholder="Contraseña" required type="password" id="password-signup">

                        <p class="conditions">Acepto los términos y condiciones.</p>

                        <div class="full-btn">Crear cuenta</div>
                        <hr>
                        <p>¿Ya tienes cuenta?</p>
                        <div @click="switchForm()" class="outline-btn">
                            Entrar
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="side-figure">
            <h1>Relleno</h1>
            <img :src="loginIcon" alt="Welcome">
            <h2>¡Únete hoy y haz que tu opinión cuente!</h2>
        </div>
    </div>
</template>

<script>
import loginSvg from '@/assets/login.svg'
export default {
    name: "LoginView",
    data() {
        return {
            loginIcon: loginSvg,
            form_state: true
        };
    },
    methods: {
        switchForm() {
            this.form_state = !this.form_state
        }
    }
};
</script>

<style scoped lang="scss">
div.login-view {
    width: 100dvw;
    margin: 0 auto;
    height: calc(100dvh - 7dvh);
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
        height: calc(100dvh - 7dvh);
        display: flex;
        flex-direction: column;
        flex-flow: column;

        div.side-figure {
            flex: 0.9;
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