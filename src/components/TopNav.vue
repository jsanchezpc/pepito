<template>
  <nav>
    <ul>
      <li>
        <h1><RouterLink to="/">Vendata</RouterLink></h1>
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
    flex-direction: row;
    justify-content: flex-end;
    li {
      list-style: none;
      display: grid;
      place-content: center;
      margin-left: 16px;

      h1 {
        margin: 0;
      }

      a {
        text-decoration: none;
        color: $primary;
        text-decoration-line: none;
        transition: text-decoration-line 3s;
      }

      a:hover {
        cursor: pointer;
        text-decoration-line: underline;
        text-decoration-thickness: 4px;
        text-underline-offset: 8px;
        text-decoration-color: $primary;
      }
    }

    li.login-btn {
      background-color: $primary;
      padding: 16px;
      a {
        color: $dark;
        font-weight: bolder;
      }
    }
  }
}
</style>
