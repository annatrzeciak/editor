<template>
  <div>
    <h2>Editor</h2>
    <textarea name="editor" rows="30" v-model="scratch" />
    <div class="description">
      <h4>You can use:</h4>
      <code v-html="'&#123;&#123; Name/BTC &#125;&#125;'" /> - to get name for
      coin with symbol BTC<br />
      <code v-html="'&#123;&#123; Exchange/BTC &#125;&#125;'" /> - to get
      current exchange rate for coin with symbol BTC
    </div>
  </div>
</template>

<script>
export default {
  name: "Editor",
  props: {
    text: { type: String, default: "", required: true }
  },
  data: () => ({
    scratch: ""
  }),
  watch: {
    text() {
      this.scratch = this.text;
    },
    scratch() {
      this.$emit("changed-text", this.scratch);
    }
  }
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 450px;
}
.description {
  width: 100%;
  text-align: left;
}
</style>
