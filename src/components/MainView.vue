<template>
  <div class="mainContent">
    <h1>Hello! Enter your text to editor</h1>
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
  display: flex;
}
.container .col {
  min-width: 300px;
  max-width: 100%;
  width: calc(50% - 38px);
  padding: 15px;
}
@media only screen and (max-width: 700px) {
  .container {
    flex-direction: column;
  }
  .container .col {
    width: calc(100% - 38px);
    min-width: calc(100% - 38px);
  }
}
</style>
