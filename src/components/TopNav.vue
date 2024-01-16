<template>
  <nav>
    <ul>
      <li>
        <h1>
          <RouterLink to="/">Relleno</RouterLink>
        </h1>
      </li>
      <li>
        <RouterLink to="/questions">Encuestas</RouterLink>
      </li>
      <li>
        <RouterLink to="/answers">Respuestas</RouterLink>
      </li>
      <li v-if="userObj.length > 0">
        <RouterLink to="/profile">Cuenta</RouterLink>
      </li>
      <li v-else class="login-btn">
        <RouterLink to="/login">Crear cuenta</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "TopNav",
  props: {
    userObj: Object,
  },
};
</script>

<style scoped lang="scss">
nav {
  display: flex;
  flex-direction: row;
  width: 100dvw;
  height: 86px;

  ul {
    margin: 0;
    padding: 0;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    position: relative;

    li {
      list-style: none;
      flex: 1;
      display: grid;
      place-content: center;
      border: none;
      border-bottom: none;
      border-bottom-width: 0%;
      transition: border-bottom-width 0.05s;

      &:first-child {
        &:hover{
          border-bottom: none;
          cursor: auto;
          a {
            cursor: pointer;
          }
        }
      }

      &:hover {
        height: calc(auto - 4px);
        cursor: pointer;
        border: none;
        border-bottom: 4px solid $primary;
        border-bottom-width: 100%;
      }

      h1 {
        margin: 0;
      }

      a {
        text-decoration: none;
        color: $primary;
      }

      &.login-btn {
        background-color: $primary;
        padding: 16px;
        transition: background-color 0.4s;

        a {
          color: $dark;
          font-weight: bolder;
        }
        &:hover {
          background-color: $dark;
          a {
            color: $primary;
          }
        }
      }

    }
  }
}
</style>
