<template>
  <div class="mainContent">
    <h1>Witaj! Wpisz tekst w edytorze</h1>
    <div class="container">
      <Editor class="col" :text="text" @changed-text="text = $event" />
      <Preview class="col" :text="text" />
    </div>
  </div>
</template>

<script>
import Editor from "./Editor";
import Preview from "./Preview";
export default {
  name: "MainView",
  components: { Preview, Editor },
  data: () => ({
    text: ""
  }),
  methods: {}
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.container {
  width: 100%;
text-align: center;
}
.container .col {
  display: inline-block;
  min-width: 300px;
  max-width: 100%;
  width: calc(50% - 30px);
  padding: 15px;
}
</style>
