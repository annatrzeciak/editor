<template>
  <div class="tag">
    <span v-if="exchange">{{ exchange }}</span>
    <span v-else>{{ "( no data for: " + coinSymbol +" ) "}}</span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TagExchange",
  props: {
    tag: { type: String, required: false, default: "" }
  },
  data: () => ({}),
  computed: {
    ...mapGetters("coin", ["allCoins", "currentExchangeRates"]),

    tagValue() {
      return this.tag.substr(2, this.tag.length - 4).trim();
    },
    coinSymbol() {
      const splitedTag = this.tagValue.split("/");
      return splitedTag[1];
    },
    coinID() {
      if (this.coinSymbol && this.allCoins) {
        const coin = this.allCoins.find(
          coin => coin.symbol === this.coinSymbol
        );
        if (coin) return coin.id;
      }
      return null;
    },
    exchange() {
      if (this.coinID && this.currentExchangeRates) {
        const exchange = this.currentExchangeRates[this.coinID];
        if (exchange) return exchange.close;
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
