<template>
    <div class="poll-item">
        <h2>{{ poll.title }}</h2>
        <!-- <details>answer details here</details> -->
        <p class="poll-description">{{ poll.description }}</p>
    </div>
</template>

<script>

export default {
    name: 'PollItem',
    props: {
        poll: Object
    },
    mounted() {
        console.log(this.poll)
    }

}

</script>

<style scoped lang="scss">
div.poll-item {
    border-radius: 16px;
    background-color: $dark-s1;
    padding: 8px 16px 8px 16px;
    margin-top: 32px;
    transition: background-color 0.15s;

    &:hover {
        cursor: pointer;
        background-color: $dark-s2;
    }

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
        color: $primary;
        font-weight: 300;
    }
}
</style>