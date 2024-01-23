<template>
  <div class="create-poll">



    <!-- HAZ UN NPM INSTALL,PERO EN LA API MELOON -->
    <div class="meta">
      <label for="poll-title">
        Title:
        <textarea
          v-model="pollTitle"
          type="text"
          id="poll-title"
          :placeholder="pollTitle"
        ></textarea>
      </label>
      <label for="poll-descr">
        Description:
        <textarea
          type="text"
          class="poll-description"
          :placeholder="pollDescr"
          id="poll-descr"
        ></textarea>
      </label>
      <div class="generate-btn">
        <img :src="generateIcon" alt="generate button" />
      </div>
    </div>
    <div v-if="generatedQuestions" class="generated-questions"></div>
    <div class="generated-questions"></div>
  </div>
</template>

<script>
import generateSvg from "@/assets/generate.svg";

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
      generateIcon: generateSvg,
      generatedQuestions: [],
      questions: []
    };
  },
  methods: {},
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
  position: relative;
  div.meta {
    position: relative;
    label {
      display: block;
      height: fit-content;
      textarea#poll-title {
        font-family: "Nunito Sans", sans-serif;
        resize: none;
        width: 100%;
        display: block;
        border: 2px solid transparent;
        outline: none;
        background-color: transparent;
        color: black;
        font-weight: 900;
        font-size: 2em;
        padding: 0;
        margin: 0px 0px 8px 0px;
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
        &::-webkit-scrollbar {
          background-color: $dark;
          border-radius: 32px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: $primary;
          border-radius: 32px;
        }
      }
      textarea.poll-description {
        font-family: "Nunito Sans", sans-serif;
        resize: none;
        width: 100%;
        display: block;
        border: 2px solid transparent;
        outline: none;
        background-color: transparent;
        color: black;
        font-weight: 900;
        font-size: 1em;
        padding: 0;
        margin-top: 0;
        &:focus {
          border-bottom: 2px solid $primary;
        }
        &::placeholder {
          color: black;
          font-weight: 900;
          font-size: 1em;
        }
      }
    }
    div.generate-btn {
      position: absolute;
      width: 100%;
      display: grid;
      place-content: center;
      img {
        width: 112px;
        cursor: pointer;
      }
    }
  }
  div.questions {
    margin-top: 32px;
  }
}
</style>
