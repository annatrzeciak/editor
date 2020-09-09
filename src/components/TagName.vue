<template>
  <div class="tag">{{ convertedTag }}</div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "TagName",
  props: {
    tag: { type: String, required: false, default: "" },
  },
  computed: {
      ...mapGetters("coin", ["allCoins", "errorWithGetData"]),

      tagValue() {
      return this.tag.substr(2, this.tag.length - 4).trim();
    },
    coinSymbol() {
      const splitedTag = this.tagValue.split("/");
      return splitedTag[1];
    },
    convertedTag() {
      if (this.coinSymbol && this.allCoins) {
        const coin = this.allCoins.find(coin=>coin.symbol ===this.coinSymbol);
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
