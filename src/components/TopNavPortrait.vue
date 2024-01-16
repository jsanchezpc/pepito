<template>
    <div class="portrait-menu">
        <div @click="toggleMenu()" class="menu-btn">
            <img :src="menuIcon" alt="menu button">
        </div>
        <div v-if="showMenu" class="menu-container">
            <div class="menu-box">
                <div>
                    <h1>Relleno</h1>
                </div>
                <div class="nav-el">
                    <div class="nav-icon">
                        <img width="32" height="32" :src="pollIcon" alt="poll button">
                    </div>
                    <div class="nav-link">
                        <router-link @click="toggleMenu()" to="/">Encuestas</router-link>
                    </div>
                </div>
                <div class="nav-el">
                    <div class="nav-icon">
                        <img width="32" height="32" :src="answersIcon" alt="config button">
                    </div>
                    <div class="nav-link">
                        <router-link @click="toggleMenu()" to="/answers">Respuestas</router-link>
                    </div>
                </div>
                <div class="nav-el config">
                    <div class="nav-icon">
                        <img width="32" @click="toggleMenu()" height="32" :src="configIcon" alt="config button">
                    </div>
                    <div class="nav-link">
                        <router-link @click="toggleMenu()" to="/settings">Configuracion</router-link>
                    </div>
                </div>
                <div v-if="!userData">
                    <router-link @click="toggleMenu()" to="/login">
                        <div class="full-btn">Entrar</div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import menuSvg from '@/assets/menu.svg'
import configSvg from '@/assets/config.svg'
import pollSvg from '@/assets/poll.svg'
import answersSvg from '@/assets/answers.svg'

export default {
    name: "TopNavComponent",
    data() {
        return {
            menuIcon: menuSvg,
            configIcon: configSvg,
            pollIcon: pollSvg,
            answersIcon: answersSvg,
            showMenu: false
        };
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu
        }
    }
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


            div {
                height: 64px;

                a {
                    font-size: 1.8em;
                    text-decoration: none;
                    color: $primary;
                    font-weight: 500;
                }
            }

            div.nav-el {
                display: flex;
                flex-direction: row;
                margin: 0 auto;

                div.nav-icon {
                    flex: 0.2;
                    display: grid;
                    place-content: center;
                }

                div.nav-link {
                    flex: 0;
                    display: grid;
                    place-content: center;
                }
            }

            div.full-btn {
                position: relative;
                bottom: 0;
                margin: 0 auto;
                display: grid;
                place-content: center;
                background-color: $primary;
                border-radius: 32px;
                color: $dark;
                font-weight: bold;
                padding: 8px;
                width: 172px;
                font-size: 0.6em;
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
}
</style>


