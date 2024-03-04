<template>
  <div class="poll-item">
    <div class="poll-meta" @click="openPoll()">
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
      <div class="share" @click="togglePopup('share')">
        <div :class="{ 'share-hover': shareHover }"></div>
        <span>Compartir</span>
      </div>
    </div>
    <img @click="displayOptions()" :src="dotsIcon" alt="delete question" />
    <div v-if="displayPollOpts" class="poll-options">
      <img :src="trashIcon" @click="togglePopup('delete')" />
    </div>
    <!-- <details>answer details here</details> -->
  </div>
  <DeletePopup
    v-if="displayPopup"
    @delete="deletePoll(poll._id, poll.author)"
    @closePopup="togglePopup('delete')"
  />
  <SharePopup v-if="showSharePopup" @closePopup="togglePopup('share')" />
</template>

<script>
import dotsSvg from "@/assets/3dots.svg";
import trashSvg from "@/assets/trash.svg";
import shareSvg from "@/assets/share.svg";
import { usePollStore } from "@/store/poll-store";
import DeletePopup from "@/components/DeletePopup.vue";
import SharePopup from "@/components/SharePopup.vue";

export default {
  name: "PollItem",
  props: {
    poll: Object,
  },
  components: {
    DeletePopup,
    SharePopup,
  },
  data() {
    return {
      dotsIcon: dotsSvg,
      trashIcon: trashSvg,
      shareIcon: shareSvg,
      displayPollOpts: false,
      displayPopup: false,
      showSharePopup: false,
    };
  },
  methods: {
    openPoll() {
      try {
        if (usePollStore().get_metrics_poll) {
          usePollStore().remove_metricsPoll();
        }
        usePollStore().update_metricsPoll(this.$props.poll);
      } catch (error) {
        console.log(error);
      } finally {
        this.$router.push("/metrics");
      }
    },
    displayOptions() {
      this.displayPollOpts = !this.displayPollOpts;
    },
    togglePopup(popupName) {
      if (popupName === "delete") {
        this.displayPopup = !this.displayPopup;
      } else if (popupName === "share") {
        this.showSharePopup = !this.showSharePopup;
      }
    },
    deletePoll() {
      usePollStore().deleteAndUpdateList(this.poll._id, this.poll.author);
      this.$emit("popPoll", this.poll._id);
      this.displayPopup = !this.displayPopup;
    },
  },
};
</script>

<style scoped lang="scss">
div.poll-item {
  border-radius: 16px;
  background-color: $dark-s1;
  padding: 8px 16px 8px 16px;
  transition: background-color 0.15s;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 540px;
  margin: 0 auto;
  margin-top: 32px;

  &:hover {
    background-color: $dark-s2;
  }

  div.poll-meta {
    h2 {
      font-size: 2.5em;
      font-weight: 700;
      margin: 0;
      color: $primary-s1;
      text-align: left;
      cursor: pointer;
    }

    p.poll-description {
      width: 80%;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: $primary-light;
      font-weight: 300;
      font-size: 1.4em;
      cursor: pointer;
      margin-top: 0;
    }
  }

  div.poll-more {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    div.status {
      display: flex;
      flex-direction: row;
      line-height: 1;
      align-items: center;

      div.status-ball {
        width: 16px;
        height: 16px;
        background-color: $primary-s1;
        border-radius: 100%;
      }

      div.status-label {
        margin-left: 4px;
        font-weight: 800;
      }
    }

    div.poll-date {
      display: grid;
      place-content: center;
      line-height: 1;

      span {
        font-weight: 300;
      }
    }

    div.share {
      padding: 4px;
      display: flex;
      flex-direction: row;
      line-height: 1;
      align-items: center;
      border-radius: 8px;
      transition: background-color 2s;

      &:hover {
        background-color: $dark-s1;
        cursor: pointer;

        div {
          width: 24px;
          background-image: url("~@/assets/share-hover.svg");
          height: 24px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        span {
          color: $primary-light;
        }
      }

      div {
        width: 24px;
        background-image: url("~@/assets/share.svg");
        height: 24px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
      }

      span {
        margin-left: 4px;
        font-weight: bolder;
        font-size: 1.1em;
        color: $primary-s1;
      }
    }
  }

  img {
    position: absolute;
    top: 8px;
    right: 8px;
    width: 36px;

    &:hover {
      cursor: pointer;
    }
  }

  div.poll-options {
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 40px;
    right: 0;
    background-color: $dark;
    border-radius: 8px;

    &:hover {
      cursor: pointer;
    }

    img {
      position: absolute;
      top: 10px;
      padding: 8px;
      width: 24px;

      &:hover {
        cursor: pointer;
        background-color: $dark-s1;
        border-radius: 100%;
        padding: 8px;
      }
    }
  }
}

@media screen and (0 <=width <=785px) {
  div.poll-item {
    border-radius: 16px;
    background-color: $dark-s1;
    padding: 8px 16px 8px 16px;
    transition: background-color 0.15s;
    display: flex;
    flex-direction: column;
    position: relative;
    width: 80%;
    margin: 0 auto;
    margin-top: 32px;

    &:hover {
      background-color: $dark-s2;
    }

    div.poll-meta {
      h2 {
        font-size: 2em;
        font-weight: 700;
        margin: 0;
        color: $primary-s1;
        text-align: left;
        cursor: pointer;
      }

      p.poll-description {
        width: 80%;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: $primary-light;
        font-size: 1.2em;
        font-weight: 300;
        cursor: pointer;
        margin-top: 0;
      }
    }

    div.poll-more {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;

      div.status {
        display: flex;
        flex-direction: row;
        line-height: 1;
        align-items: center;

        div.status-ball {
          width: 12px;
          height: 12px;
          background-color: $primary-s1;
          border-radius: 100%;
        }

        div.status-label {
          margin-left: 4px;
          font-weight: 800;
          font-size: 1em;
        }
      }

      div.poll-date {
        display: grid;
        place-content: center;
        line-height: 1;

        span {
          font-weight: 300;
          font-size: 0.8em;
        }
      }

      div.share {
        padding: 4px;
        display: flex;
        flex-direction: row;
        line-height: 1;
        align-items: center;
        border-radius: 8px;
        transition: background-color 2s;

        &:hover {
          background-color: $dark-s1;
          cursor: pointer;

          div {
            width: 16px;
            background-image: url("~@/assets/share-hover.svg");
            height: 16px;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }

          span {
            color: $primary-light;
          }
        }

        div {
          width: 16px;
          background-image: url("~@/assets/share.svg");
          height: 16px;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }

        span {
          margin-left: 4px;
          font-weight: bolder;
          font-size: 0.8em;
          color: $primary-s1;
        }
      }
    }

    img {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 32px;

      &:hover {
        cursor: pointer;
      }
    }

    div.poll-options {
      display: flex;
      flex-direction: row;
      position: absolute;
      top: 40px;
      right: 0;
      background-color: $dark;
      border-radius: 8px;

      &:hover {
        cursor: pointer;
      }

      img {
        position: absolute;
        top: 10px;
        padding: 8px;
        width: 24px;

        &:hover {
          cursor: pointer;
          background-color: $dark-s1;
          border-radius: 100%;
          padding: 8px;
        }
      }
    }
  }
}
</style>
