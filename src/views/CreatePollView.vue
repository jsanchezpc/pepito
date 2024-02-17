<template>
  <div class="poll-view" :class="{ 'fill-height': questions.length > 0 }">
    <div class="create-poll">
      <input spellcheck="false" class="poll-title" type="text" v-model="pollTitle"
        :placeholder="$t('views.create_poll.title')" />
      <br />
      <textarea spellcheck="false" class="poll-description" v-model="pollDescr"
        :placeholder="$t('views.create_poll.title')"></textarea>
      <div class="generate-box">
        <div @click="generateQuestions()" class="generate-btn">
          <img class="generate-img" :src="generateIcon" alt="generate button image" />
        </div>
      </div>
    </div>

    <div v-if="showLoader" class="wait-animation">
      <LottieAnimation class="wait-lottie" :animation-data="rellenoLottie" :auto-play="true" :loop="true" />
    </div>

    <div v-else-if="!showLoader && questions.length <= 0" class="wait-animation">
      <LottieAnimation class="wait-lottie" :animation-data="waitingLottie" :auto-play="true" :loop="true" />
    </div>

    <TransitionGroup name="list" tag="div">
      <form v-if="questions && questions.length > 0" class="question-list">

        <AnswerTemplate v-for="question in questions" :key="question.id" :question="question"
          @deleteQuestion="deleteQuestion" @deleteAnswer="deleteAnswer" />

      </form>
    </TransitionGroup>

    <div v-if="questions && questions.length > 0" class="save-poll">
      <div @click="$router.push('/')" class="discard">Discard</div>
      <div @click="savePoll()" class="save">Save</div>
    </div>
  </div>
</template>

<script>
import { usePollStore } from '@/store/poll-store';
import AnswerTemplate from "@/components/AnswerTemplate";
import waitingJson from "@/assets/waiting_lottie.json";
import rellenoJson from "@/assets/relleno_lottie.json";
import generateSvg from "@/assets/generate.svg";
import axios from "axios";
import { LottieAnimation } from "lottie-web-vue";

export default {
  name: "CreatePollView",
  props: {
    user: Object,
  },
  components: { LottieAnimation, AnswerTemplate },
  data() {
    return {
      pollMaxCount: 10,
      pollTitle: "",
      pollDescr: "",
      waitingLottie: waitingJson,
      rellenoLottie: rellenoJson,
      generateIcon: generateSvg,
      showQuestions: false,
      showLoader: false,
      questions: [],
      language: JSON.parse(localStorage.getItem("user")).language,
    };
  },
  methods: {
    generateQuestions() {
      if (this.questions.length > 0) {
        this.questions = [];
      }
      this.showLoader = true;
      axios
        .post(`${process.env.VUE_APP_API_URL}/generatePoll`, {
          poll_title: this.pollTitle,
          poll_description: this.pollDescr,
          pollMaxCount: this.pollMaxCount,
        })
        .then(async (res) => {
          console.log(res);
          await usePollStore().update_poll(res.data.generated);
          this.questions = await usePollStore().get_poll();
          console.log(this.questions);
          this.showLoader = false;
          this.showQuestions = true;
        })
        .catch((error) => {
          console.error('Error generating poll:', error);
          this.showLoader = false;
        });
    },
    savePoll() {
      axios
        .post(`${process.env.VUE_APP_API_URL}/signup`, this.questions)
        .then(response => {
          console.log(response)
        })
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

  form.question-list {
    width: 50dvw;
    margin: 0 auto;

    .list-enter-active,
    .list-leave-active {
      transition: all 0.5s ease;
    }

    .list-enter-from,
    .list-leave-to {
      opacity: 0;
      transform: translateX(30px);
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

    form.question-list {
      width: 80dvw;
      margin: 0 auto;

      .list-enter-active,
      .list-leave-active {
        transition: all 0.5s ease;
      }

      .list-enter-from,
      .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
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
