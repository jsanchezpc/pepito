<template>
  <div class="create-poll">
    <form>
      <div class="meta">
        <label for="poll-title">
          Title:
          <input
            v-model="pollTitle"
            type="text"
            id="poll-title"
            :placeholder="pollTitle"
          />
        </label>
        <label for="poll-descr">
          Description:
          <input
            type="text"
            class="poll-description"
            :placeholder="pollDescr"
            id="poll-descr"
          />
        </label>
        <div class="questions">

        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreatePollView",
  props: {
    user: Object,
  },
  data() {
    return {
      pollMaxCount: 10,
      pollTitle: "Titulo de la encuesta",
      pollDescr: "¿Sabías que puedes hacer click en éste título para editarlo?",
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
div.create-poll {
  width: 80dvw;
  margin: 0 auto;
  background-color: white;
  padding: 32px;
  border-radius: 32px;
  box-shadow: 8px 8px $dark-light;
  margin-top: 16px;
  form {
    div.meta {
        label {
            margin-top: 8px;
            margin-bottom: 4px;
        }
      input#poll-title {
        width: 100%;
        display: block;
        border: 2px solid transparent;
        outline: none;
        background-color: transparent;
        height: 32px;
        color: black;
        font-weight: 900;
        font-size: 2em;
        &:focus {
          border-bottom: 2px solid $primary;
        }
        &:hover {
          cursor: pointer;
        }
        &::placeholder {
          color: black;
          font-weight: 900;
          font-size: 1em;
        }
      }
      input.poll-description {
        width: 100%;
        display: block;
        border: 2px solid transparent;
        outline: none;
        background-color: transparent;
        height: 32px;
        color: black;
        font-weight: 900;
        font-size: 1em;
        &:focus {
          border-bottom: 2px solid $primary;
        }
        &::placeholder {
          color: black;
          font-weight: 900;
          font-size: 1em;
        }
      }

      div.questions {
        margin-top: 32px;
      }
    }
  }
}
</style>
