<template>
  <div class="poll-view" :class="{ 'fill-height': questions.length > 0 }">
    <div class="create-poll">
      <input
        spellcheck="false"
        class="poll-title"
        type="text"
        v-model="pollTitle"
        :placeholder="$t('views.create_poll.title')"
      />
      <br />
      <textarea
        spellcheck="false"
        class="poll-description"
        v-model="pollDescr"
        :placeholder="$t('views.create_poll.title')"
      ></textarea>
      <div class="generate-box">
        <div @click="generateQuestions()" class="generate-btn">
          <img
            class="generate-img"
            :src="generateIcon"
            alt="generate button image"
          />
        </div>
      </div>
    </div>

    <div v-if="showLoader" class="wait-animation">
      <LottieAnimation
        class="wait-lottie"
        :animation-data="rellenoLottie"
        :auto-play="true"
        :loop="true"
      />
    </div>
    <div
      v-else-if="!showLoader && questions.length <= 0"
      class="wait-animation"
    >
      <LottieAnimation
        class="wait-lottie"
        :animation-data="waitingLottie"
        :auto-play="true"
        :loop="true"
      />
    </div>

    <div class="questions-list" v-if="questions && questions.length > 0">
      <TransitionGroup name="list" tag="div">
        <div class="question" v-for="question in questions" :key="question.id">
          <div>
            <h1
              class="question-title"
              contenteditable="true"
              spellcheck="false"
              v-on:key.capture="changeQuestion(question.id)"
            >
              {{ question.question }}
            </h1>
            <div class="delete">
              <img
                @click="deleteQuestion(question.id)"
                width="32"
                height="32"
                :src="trashIcon"
                alt="delete answer"
              />
            </div>
          </div>
          <div class="question-answers">
            <div class="answer-list">
              <div
                class="answer"
                v-for="answer in question.answers"
                :key="answer.id"
              >
                <div class="answer-option">
                  <div
                    contenteditable="true"
                    spellcheck="false"
                    v-on:key.capture="changeAnswer(answer.id)"
                  >
                    {{ answer.text }}
                  </div>
                </div>
                <div class="delete">
                  <img
                    @click="deleteAnswer(answer.id, question.id)"
                    width="32"
                    height="32"
                    :src="deleteIcon"
                    alt="delete answer"
                  />
                </div>
              </div>
              <div class="other" v-if="question.other == true">
                <input class="other-option" placeholder="Relleno" type="text" />
                <div class="delete">
                  <img
                    @click="deleteOtherAnswer(question.id)"
                    width="32"
                    height="32"
                    :src="deleteIcon"
                    alt="delete answer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div v-if="questions && questions.length > 0" class="save-poll">
      <div @click="$router.push('/')" class="discard">Discard</div>
      <div class="save">Save</div>
    </div>
  </div>
</template>

<script>
import waitingJson from "@/assets/waiting_lottie.json";
import rellenoJson from "@/assets/relleno_lottie.json";
import generateSvg from "@/assets/generate.svg";
import deleteSvg from "@/assets/delete.svg";
import trashSvg from "@/assets/trash.svg";
import axios from "axios";
import { LottieAnimation } from "lottie-web-vue";

export default {
  name: "CreatePollView",
  props: {
    user: Object,
  },
  components: { LottieAnimation },
  data() {
    return {
      pollMaxCount: 10,
      pollTitle: "",
      pollDescr: "",
      waitingLottie: waitingJson,
      rellenoLottie: rellenoJson,
      generateIcon: generateSvg,
      deleteIcon: deleteSvg,
      trashIcon: trashSvg,
      showQuestions: false,
      showLoader: false,
      generatedQuestions: [],
      questions: [],
      language: JSON.parse(localStorage.getItem("user")).language,
    };
  },
  methods: {
    generateQuestions() {
      this.showLoader = true;
      console.log("wait for the response please...", {
        poll_title: this.pollTitle,
        poll_description: this.pollDescr,
      });
      axios
        .post(`${process.env.VUE_APP_API_URL}/generatePoll`, {
          poll_title: this.pollTitle,
          poll_description: this.pollDescr,
          pollMaxCount: this.pollMaxCount,
        })
        .then((res) => {
          console.log(res);
          this.questions = res.data.generated.questions;
        })
        .then(() => {
          this.showLoader = false;
          this.showQuestions = true;
        });
    },
    changeQuestion(id, newQuestionText) {
      const questionIndex = this.questions.findIndex(
        (question) => question.id === id
      );
      if (questionIndex !== -1) {
        this.$set(this.questions, questionIndex, {
          ...this.questions[questionIndex],
          question: newQuestionText,
        });
      }
    },
    changeAnswer(questionId, answerId, newAnswerText) {
      const questionIndex = this.questions.findIndex(
        (question) => question.id === questionId
      );
      if (questionIndex !== -1) {
        const answerIndex = this.questions[questionIndex].answers.findIndex(
          (answer) => answer.id === answerId
        );
        if (answerIndex !== -1) {
          this.$set(this.questions[questionIndex].answers, answerIndex, {
            ...this.questions[questionIndex].answers[answerIndex],
            text: newAnswerText,
          });
          console.log(this.questions[questionIndex].answers[answerIndex]);
        }
      }
    },
    deleteQuestion(questionId) {
      return (this.questions = this.questions.filter(
        (question) => question.id !== questionId
      ));
    },
    deleteAnswer(answerId, questionId) {
      const questionIndex = this.questions.findIndex(
        (question) => question.id === questionId
      );

      if (this.questions[questionIndex].answers.length >= 1) {
        if (questionIndex !== -1) {
          this.questions[questionIndex].answers = this.questions[
            questionIndex
          ].answers.filter((answer) => answer.id !== answerId);
        }
      }
    },
    deleteOtherAnswer(questionId) {
      const questionIndex = this.questions.findIndex(
        (question) => question.id === questionId
      );

      if (this.questions[questionIndex].answers.length >= 1) {
        if (questionIndex !== -1) {
          this.questions[questionIndex].other = this.questions[
            questionIndex
          ].other = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
div.poll-view {
  width: 80dvw;
  height: calc(100dvh - 7dvh);
  display: grid;
  place-content: center;
  margin: 0 auto;

  &.fill-height {
    height: -webkit-fill-available;
  }

  div.create-poll {
    width: 50dvw;
    padding: 32px 32px 16px 32px;
    border-radius: calc(32px - 16px);
    margin-top: 16px;
    position: relative;

    input.poll-title {
      border-radius: 8px;
      background-color: $dark-s1;
      color: $primary;
      padding: 8px;
      width: calc(100% - 10px);
      height: calc(32px - 8px);
      font-size: 0.95em;
      font-weight: 600;
      outline: none;
      border: none;
    }

    textarea.poll-description {
      border-radius: 8px;
      background-color: $dark-s1;
      color: $primary;
      padding: 8px;
      width: calc(100% - 8px);
      height: calc(128px - 8px);
      margin-top: 8px;
      resize: none;
      outline: none;
      font-family: "Nunito Sans", sans-serif;
      line-height: 1.95em;
      font-size: 1em;
      text-align: justify;
      font-weight: 500;
      border: none;
    }

    div.generate-box {
      display: grid;
      place-content: center;

      div.generate-btn {
        img.generate-img {
          width: 64px;
          cursor: pointer;
        }
      }
    }
  }

  div.wait-animation {
    display: grid;
    place-content: center;
    width: 50dvw;
    height: 480px;
    margin: 0 auto;

    .wait-lottie {
      width: 60%;
      margin: 0 auto;
    }
  }

  div.questions-list {
    width: 50dvw;
    margin: 0 auto;
    position: relative;

    &:first-child {
      margin-top: 32px;
    }

    .list-move,
    /* apply transition to moving elements */
    .list-enter-active,
    .list-leave-active {
      transition: all 0.5s ease;
    }

    .list-enter-from,
    .list-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }

    /* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
    .list-leave-active {
      position: absolute;
    }

    div.question {
      border-radius: 32px;
      margin: 32px auto;

      div {
        display: flex;
        flex-direction: row;

        h1.question-title {
          font-size: 1.35em;
          margin: 0;
          text-align: center;
          flex: 0.95;
          outline: none;

          &:focus {
            background-color: $dark-s1;
            border-radius: 4px;
          }
        }

        div.delete {
          flex: 0.05;
          display: grid;
          place-content: center;
          margin-left: 8px;

          img {
            width: 24px;

            &:hover {
              cursor: pointer;
            }
          }
        }
      }

      div.question-answers {
        div.answer-list {
          display: flex;
          flex-direction: column;
          width: 100%;

          &:first-child {
            margin-top: 4px;
          }

          div.answer {
            display: flex;
            flex-direction: row;
            outline: none;
            margin-top: 4px;

            div.answer-option {
              flex: 0.98;
              padding: 8px;
              border-radius: 8px;
              margin: 0 auto 4px;
              color: $primary;
              background-color: $dark-s1;
              border: none;
              font-weight: 800;
              outline: none;
              font-size: 1em;
              height: auto;
              display: grid;
              align-items: center;

              &:hover {
                cursor: pointer;
                background-color: $dark-s2;
              }

              div {
                height: auto;
                -webkit-line-clamp: 3;
                line-clamp: 3;
                -webkit-box-orient: vertical;
              }
            }

            div.delete {
              flex: -0.8;
              display: grid;
              place-content: center;
              margin-bottom: 4px;
              margin-left: 8px;

              img {
                width: 28px;

                &:hover {
                  fill: red;
                  cursor: pointer;
                }
              }
            }
          }

          div.other {
            input.other-option {
              padding: 8px;
              border: 2px solid $dark-light;
              border-radius: 8px;
              margin: 4px auto 4px;
              color: $dark;
              font-weight: 800;
              outline: none;
              width: -webkit-fill-available;
              background-color: $dark-light;
              height: 32px;
              display: grid;
              align-items: center;
              flex: 1;
            }

            div.delete {
              flex: -0.8;
              display: grid;
              place-content: center;
              margin-bottom: 4px;
              margin-left: 8px;

              img {
                width: 28px;

                &:hover {
                  fill: red;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }

  div.save-poll {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 8px;
    margin-bottom: 32px;

    div.discard {
      flex: 0.5;
      background-color: $dark;
      text-align: center;
      color: $primary;
      cursor: pointer;
      height: 64px;
      display: grid;
      place-content: center;
      font-weight: 600;
      transition: background-color 0.33s color 0.33s;
      border-radius: 32px;

      &:hover {
        color: $primary-s1;
        background-color: $dark-s1;
      }
    }

    div.save {
      flex: 0.5;
      background-color: $primary-s1;
      color: $dark;
      text-align: center;
      cursor: pointer;
      height: 64px;
      display: grid;
      place-content: center;
      font-weight: 900;
      transition: background-color 1s color 1s;
      border-radius: 32px;

      &:hover {
        color: $dark-s1;
        background-color: $primary;
      }
    }
  }
}

@media screen and (max-width: 785px) {
  div.poll-view {
    width: 80dvw;
    height: calc(100dvh - 7dvh);
    display: grid;
    place-content: center;
    margin: 0 auto;

    &.fill-height {
      height: -webkit-fill-available;
    }

    div.create-poll {
      width: 80dvw;
      padding: 32px 32px 16px 32px;
      border-radius: calc(32px - 16px);
      margin-top: 16px;
      position: relative;

      input.poll-title {
        border-radius: 8px;
        background-color: $dark-s1;
        color: $primary;
        padding: 8px;
        width: calc(100% - 10px);
        height: calc(32px - 8px);
        font-size: 0.95em;
        font-weight: 600;
        outline: none;
        border: none;
      }

      textarea.poll-description {
        border-radius: 8px;
        background-color: $dark-s1;
        color: $primary;
        padding: 8px;
        width: calc(100% - 8px);
        height: calc(128px - 8px);
        margin-top: 8px;
        resize: none;
        outline: none;
        font-family: "Nunito Sans", sans-serif;
        line-height: 1.95em;
        font-size: 1em;
        text-align: justify;
        font-weight: 500;
        border: none;
      }

      div.generate-box {
        display: grid;
        place-content: center;

        div.generate-btn {
          img.generate-img {
            width: 64px;
            cursor: pointer;
          }
        }
      }
    }

    div.wait-animation {
      display: grid;
      place-content: center;
      width: 100%;
      height: 480px;

      .wait-lottie {
        width: 60%;
        margin: 0 auto;
      }
    }

    div.questions-list {
      width: 100%;
      position: relative;

      &:first-child {
        margin-top: 32px;
      }

      div.question {
        border-radius: 32px;
        margin: 32px auto;

        div {
          display: flex;
          flex-direction: row;

          h1.question-title {
            font-size: 1.35em;
            margin: 0;
            text-align: center;
            flex: 0.95;
            outline: none;

            &:focus {
              background-color: $dark-s1;
              border-radius: 4px;
            }
          }

          div.delete {
            flex: 0.05;
            display: grid;
            place-content: center;
            margin-left: 8px;

            img {
              width: 24px;

              &:hover {
                cursor: pointer;
              }
            }
          }
        }

        div.question-answers {
          div.answer-list {
            display: flex;
            flex-direction: column;
            width: 100%;

            &:first-child {
              margin-top: 4px;
            }

            div.answer {
              display: flex;
              flex-direction: row;
              outline: none;
              margin-top: 4px;

              div.answer-option {
                flex: 0.98;
                padding: 8px;
                border-radius: 8px;
                margin: 0 auto 4px;
                color: $primary;
                background-color: $dark-s1;
                border: none;
                font-weight: 800;
                outline: none;
                font-size: 0.8em;
                height: auto;
                display: grid;
                align-items: center;

                &:hover {
                  cursor: pointer;
                  background-color: $dark-s2;
                }

                div {
                  height: auto;
                  -webkit-line-clamp: 3;
                  line-clamp: 3;
                  -webkit-box-orient: vertical;
                }
              }

              div.delete {
                flex: -0.8;
                display: grid;
                place-content: center;
                margin-bottom: 4px;
                margin-left: 8px;

                img {
                  width: 28px;

                  &:hover {
                    fill: red;
                    cursor: pointer;
                  }
                }
              }
            }

            div.other {
              input.other-option {
                padding: 8px;
                border: 2px solid $dark-light;
                border-radius: 8px;
                margin: 4px auto 4px;
                color: $dark;
                font-weight: 800;
                outline: none;
                width: -webkit-fill-available;
                background-color: $dark-light;
                height: 32px;
                display: grid;
                align-items: center;
                flex: 1;
              }

              div.delete {
                flex: -0.8;
                display: grid;
                place-content: center;
                margin-bottom: 4px;
                margin-left: 8px;

                img {
                  width: 28px;

                  &:hover {
                    fill: red;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }
    }

    div.save-poll {
      width: 100%;
      display: flex;
      flex-direction: row;
      margin-top: 8px;
      margin-bottom: 32px;

      div.discard {
        flex: 0.5;
        background-color: $dark;
        text-align: center;
        color: $primary;
        cursor: pointer;
        height: 64px;
        display: grid;
        place-content: center;
        font-weight: 600;
        transition: background-color 0.33s color 0.33s;
        border-radius: 32px;

        &:hover {
          color: $primary-s1;
          background-color: $dark-s1;
        }
      }

      div.save {
        flex: 0.5;
        background-color: $primary-s1;
        color: $dark;
        text-align: center;
        cursor: pointer;
        height: 64px;
        display: grid;
        place-content: center;
        font-weight: 900;
        transition: background-color 1s color 1s;
        border-radius: 32px;

        &:hover {
          color: $dark-s1;
          background-color: $primary;
        }
      }
    }
  }
}
</style>
