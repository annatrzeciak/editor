<template>
  <div class="tag">{{ convertedTag }}</div>
</template>

<script>
export default {
  name: "TagName",
  props: {
    tag: { type: String, required: false, default: "" },
    allCoins: { type: Object, required: false, default: () => {} }
  },
  computed: {
    tagValue() {
      return this.tag.substr(2, this.tag.length - 4).trim();
    },
    coinSymbol() {
      const splitedTag = this.tagValue.split("/");
      return splitedTag[1];
    },
    convertedTag() {
      if (this.coinSymbol && this.allCoins) {
        const coin = this.allCoins[this.coinSymbol];
        if (coin) return coin.name;
      }
      return null;
    }
  }
};
</script>

<style scoped>
.tag {
  display: inline-block;
}
</style>
