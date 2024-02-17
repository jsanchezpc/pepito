<template>
  <div class="answer-template">
    <div class="question-title">
      <h1 contenteditable="true" spellcheck="false" type="text">
        {{ question.question }}
      </h1>
      <img @click="deleteQuestion(question.id)" width="32" :src="trashIcon" alt="trash icon (delete question)" />
    </div>

    <div v-for="answer in question.answers" :key="answer.id" class="question-answer">
      <input type="text" :value="answer.text" />
      <img @click="deleteAnswer(answer.id, question.id)" width="32" :src="deleteIcon" alt="delete icon (delete answer)" />
    </div>

  </div>
</template>

<script>
import deleteSvg from "@/assets/delete.svg";
import trashSvg from "@/assets/trash.svg";
export default {
  name: "AnswerTemplate",
  props: {
    question: Object,
  },
  data() {
    return {
      deleteIcon: deleteSvg,
      trashIcon: trashSvg,
    };
  },
  methods: {
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

    h1 {
      background-color: transparent;
      width: 100%;
      border: none;
      outline: none;
      color: $primary;
      font-size: 2em;
      height: fit-content;
      text-align: center;

      &:focus {
        outline: none;
        border: none;
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
