<template>
  <div class="answer-template">
    <div class="question-title">
      <textarea @input="changeQuestion(questionObj.id, questionObj.question)" spellcheck="false" type="text"
        v-model="questionObj.question"></textarea>
      <img @click="deleteQuestion(question.id)" width="28" :src="trashIcon" alt="trash icon (delete question)" />
    </div>

    <div v-for="answer in question.answers" :key="answer.id" class="question-answer">
      <input @input="changeAnswer(answer.id, questionObj.id, answer.text)" type="text" v-model="answer.text" />
      <img @click="deleteAnswer(answer.id, question.id)" width="32" :src="deleteIcon" alt="delete icon (delete answer)" />
    </div>
  </div>
</template>

<script>
import deleteSvg from "@/assets/delete.svg";
import trashSvg from "@/assets/trash.svg";
export default {
  name: "QuestionTemplate",
  props: {
    question: Object,
  },
  data() {
    return {
      deleteIcon: deleteSvg,
      trashIcon: trashSvg,
      questionObj: this.question
    };
  },
  methods: {
    changeQuestion(questionId, question) {
      this.$emit("changeQuestion", questionId, question);
    },
    changeAnswer(answerId, questionId, answer) {
      this.$emit("changeAnswer", answerId, questionId, answer);
    },
    deleteQuestion(question) {
      this.$emit("deleteQuestion", question);
    },
    deleteAnswer(answerId, questionId) {
      this.$emit("deleteAnswer", answerId, questionId);
    },
  },
};
</script>

<style lang="scss" scoped>
div.answer-template {
  display: flex;
  flex-direction: column;

  div.question-title {
    display: flex;
    flex-direction: row;

    textarea {
      background-color: transparent;
      width: 100%;
      border: none;
      outline: none;
      color: $primary;
      font-size: 1.8em;
      height: fit-content;
      text-align: center;
      resize: none;
      font-family: "Nunito Sans", sans-serif;
      font-weight: bold;
      min-height: fit-content;
      margin-bottom: 16px;
      margin-top: 16px;
      border-radius: 0px;
      border-bottom: 2px dotted $primary-s1;

      &::-webkit-scrollbar, &::-webkit-scrollbar-track, &::-webkit-scrollbar-thumb {
        display: none;
      }

      &:focus {
        outline: none;
        border: none;
        background-color: $dark-s1;
        border-radius: 8px;
        border-bottom: 4px solid $dark-s2;

        &::-webkit-scrollbar {
          width: 4px;
        }

        &::-webkit-scrollbar-track {
          -webkit-box-shadow: $dark-s1;
        }

        &::-webkit-scrollbar-thumb {
          background-color: $primary;
          outline: 1px solid $primary-s1;
          cursor: pointer;
          border-radius: 4px;
        }
      }
    }

    img {
      margin-left: 8px;

      &:hover {
        cursor: pointer;
      }
    }
  }

  div.question-answer {
    display: flex;
    flex-direction: row;

    input {
      background-color: $dark-s1;
      border: none;
      border-radius: 8px;
      width: 100%;
      color: $primary;
      font-weight: bold;
      font-size: 1em;
      padding: 16px;
      margin-bottom: 8px;

      &:focus {
        border: none;
        outline: none;
      }
    }

    img {
      margin-left: 8px;
      margin-bottom: 8px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
