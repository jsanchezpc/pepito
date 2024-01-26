<template>
  <div class="create-poll">
    
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
      questions: [],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>

</style>
