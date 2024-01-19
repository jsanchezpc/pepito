<template>
    <div class="config-box">
        <div class="background-overlay"></div>
        <div class="configuration">

        </div>
    </div>
</template>

<script>
export default {
  name: "ConfigComponent",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>

div.config-box {
    position: absolute;
    div.background-overlay {
        background-color: rgba(0, 0, 0, 0.420);
    }
}


</style>
