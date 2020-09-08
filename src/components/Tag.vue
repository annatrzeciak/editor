<template>
  <div class="tag">
    {{ tag }}
  </div>
</template>

<script>
export default {
  name: "Tag",
  props: {
    tag: { type: String, required: false, default: "" }
  }
};
</script>

<style scoped>
.tag {
  display: inline-block;
}
</style>
