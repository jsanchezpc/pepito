<template>
  <div class="poll-item">
    <div class="poll-meta">
      <h2>{{ poll.title }}</h2>
      <p class="poll-description">{{ poll.description }}</p>
    </div>
    <div class="poll-more">
      <!-- STATUS -->
      <div class="status">
        <div class="status-ball"></div>
        <div class="status-label">{{ "Activa" }}</div>
      </div>
      <!-- DATE -->
      <div class="poll-date">
        <span>13/02/2021</span>
      </div>
    </div>
    <img
      @click="displayOptions()"
      width="32px"
      :src="dotsIcon"
      alt="delete question"
    />
    <div v-if="displayPollOpts" class="poll-options" @click="showPopup()">
      <p>Delete</p>
      <img width="16px" :src="trashIcon" />
    </div>
    <!-- <details>answer details here</details> -->
  </div>
  <DeletePopup :deletePoll="deletePoll()" />
</template>

<script>
import dotsSvg from "@/assets/3dots.svg";
import trashSvg from "@/assets/trash.svg";
import { usePollStore } from "@/store/poll-store";
import DeletePopup from "@/components/DeletePopup.vue";

export default {
  name: "PollItem",
  props: {
    poll: Object,
  },
  component: {
    DeletePopup,
  },
  data() {
    return {
      dotsIcon: dotsSvg,
      trashIcon: trashSvg,
      displayPollOpts: false,
      displayPopup: false,
    };
  },
  mounted() {
    console.log(this.poll);
  },
  methods: {
    displayOptions() {
      this.displayPollOpts = !this.displayPollOpts;
    },
    showPopup() {
      this.displayPopup = !this.displayPopup
    },
    deletePoll() {
      usePollStore().deleteAndUpdateList(this.poll._id, this.poll.author);
    }
  },
};
</script>

<style scoped lang="scss">
div.poll-item {
  border-radius: 16px;
  background-color: $dark-s1;
  padding: 8px 16px 8px 16px;
  margin-top: 32px;
  transition: background-color 0.15s;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    background-color: $dark-s2;
  }

  div.poll-meta {
    h2 {
      font-size: 1.35em;
      font-weight: 700;
      margin: 0;
      color: $primary-s1;
    }

    p.poll-description {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: $primary-light;
      font-weight: 300;
    }
  }

  div.poll-more {
    display: flex;
    flex-direction: row;
    line-height: 1;
    justify-content: space-evenly;
    div.status {
      display: flex;
      flex-direction: row;
      div.status-ball {
        width: 16px;
        height: 16px;
        background-color: $primary-s1;
        border-radius: 100%;
      }

      div.status-label {
        margin-left: 8px;
        font-weight: 800;
      }
    }

    div.poll-date {
      span {
        font-weight: 300;
      }
    }
  }

  img {
    position: absolute;
    top: 8px;
    right: 8px;
    &:hover {
      cursor: pointer;
    }
  }

  div.poll-options {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 40px;
    right: 16px;
    width: 128px;
    background-color: $dark;
    border-radius: 8px;
    border: 1.5px solid $dark-light;
    &:hover {
      cursor: pointer;
    }
    p {
      flex: 0.6;
      margin: 8px 0 8px 4px;
      font-weight: bolder;
    }
    img {
      flex: 0.4;
      position: absolute;
      top: 10px;
    }
  }
}
</style>
