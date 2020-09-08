<template>
  <div class="tag">{{ "TagExchange:" + tag }}</div>
</template>

<script>
export default {
  name: "TagExchange",
  props: {
    tag: { type: String, required: false, default: "" },
    allCoins: { type: Object, required: false, default: () => {} },
    allExchanges: { type: Object, required: false, default: () => {} }
  }
};
</script>

<style scoped>
.tag {
  display: inline-block;
}
</style>
