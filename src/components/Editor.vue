<template>
  <div>
    <h2>Edytor</h2>
    <textarea name="editor" rows="30" v-model="scratch" />
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
}
</style>
