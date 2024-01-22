<template>
  <div @click="startPoll()" class="full-btn">
    <span>{{ $t("components.poll_btn") }}</span>
  </div>
</template>

<script>
import { useUserStore } from '@/store/user-store';

export default {
  name: "PollBtn",
  data() {
    return {

    }
  },
  methods: {
    startPoll() {
      console.log('Starting a poll...')
      if(useUserStore().get_user) {
        this.$router.push('/new-poll')
      }
    }
  }

};
</script>

<style lang="scss" scoped>
div.full-btn {
  margin: 0 auto;
  text-align: center;
  background-color: $primary;
  border-radius: 32px;
  color: $dark;
  font-weight: bold;
  padding: 16px;
  width: 255px;
  border: none;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  transition: background-color 0.4s;
  cursor: pointer;

  &:hover {
    background-color: $primary-s1;
  }
}
</style>
