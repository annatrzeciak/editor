<template>
  <div>
    <h2>Podgląd</h2>
    <textarea disabled="true" name="preview" rows="30" :value="text"></textarea>
  </div>
</template>

<script>
export default {
  name: "Preview",
  props: {
    text: { type: String }
  }
};
</script>

<style scoped>
textarea {
  width: 100%;
}
</style>
