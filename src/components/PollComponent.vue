<template>
    <div class="poll-component" :class="{ 'fill-height': questions.length > 0 }">
        <div class="meta">
            <textarea spellcheck="false" type="text" v-html="poll.title"></textarea>
            <textarea class="descr" spellcheck="false" type="text" v-html="poll.description"></textarea>
        </div>
        <QuestionTemplate v-for="question in questions" :key="question.id" :question="question"
            @changeQuestion="changeQuestion" @changeAnswer="changeAnswer" @deleteQuestion="deleteQuestion"
            @deleteAnswer="deleteAnswer" />
        <div class="save-poll">
            <div @click="$router.push('/')" class="discard">Discard</div>
            <div @click="savePoll()" class="save">Save</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { usePollStore } from '@/store/poll-store';
import { useUserStore } from '@/store/user-store';
import QuestionTemplate from "@/components/QuestionTemplate.vue"

export default {
    name: "PollComponent",
    props: {
        poll: Object,
        user: Object
    },
    components: {
        QuestionTemplate
    },
    data() {
        return {
            questions: []
        }
    },
    mounted() {
        this.questions = this.$props.poll.questions
        console.log(this.$props.poll)
    },
    methods: {
        savePoll() {
            axios
                .post(`${process.env.VUE_APP_API_URL}/editPoll`, {
                    id: this.poll._id,
                    title: this.$props.poll.title,
                    description: this.$props.poll.description,
                    questions: this.poll,
                    token: useUserStore().get_token
                })
                .then((response) => {
                    if (response.data.ok) {
                        this.$router.push("/");
                    } else {
                        console.log("Error saving your poll.");
                    }
                })
                .catch((res) => console.log(res));
        },
        changeQuestion(questionId, newQuestion) {
            const questionIndex = this.questions.findIndex(
                (question) => question.id === questionId
            );
            this.questions[questionIndex].question = newQuestion;
        },
        changeAnswer(answerId, questionId, newAnswer) {
            try {
                const questionIndex = this.questions.findIndex(
                    (question) => question.id === questionId
                );
                const answerIndex = this.questions[questionIndex].answers.findIndex(
                    (answer) => answer.id === answerId
                );

                this.questions[questionIndex].answers[answerIndex].text = newAnswer;
            } catch (error) {
                console.log(error);
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
    beforeMount() {
        usePollStore().remove_poll();
    }
}
</script>

<style lang="scss" scoped>
div.poll-component {
    width: 50dvw;
    padding: 32px 32px 16px 32px;
    border-radius: calc(32px - 16px);
    margin-top: 16px;
    position: relative;
    margin: 0 auto;
    height: -webkit-fill-available;

    &.fill-height {
        height: -webkit-fill-available;
    }

    div.meta {
        textarea {
            background-color: transparent;
            width: 100%;
            border: none;
            outline: none;
            color: $primary;
            font-size: 2em;
            text-align: left;
            resize: none;
            min-height: fit-content;
            margin-bottom: 16px;
            margin-top: 16px;
            border-radius: 0px;
            font-family: "Anton", sans-serif;
            font-weight: 400;
            font-style: normal;

            &::-webkit-scrollbar,
            &::-webkit-scrollbar-track,
            &::-webkit-scrollbar-thumb {
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

        textarea.descr {
            font-size: 1em;
            font-family: "Nunito Sans", sans-serif;
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
</style>