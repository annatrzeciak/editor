<template>
  <div>
    <h2>Preview</h2>
    <textarea disabled="true" name="preview" rows="30" :value="convertedText" />
    <div class="loading" v-if="loading">
      <img src="/loading.gif" alt="Loading gif" />Data is being loaded, please
      wait
    </div>
    <div class="error" v-for="error in errors" :key="error.id" v-html="error" />
    <div class="error" v-if="errorWithGetData" >An error occurred while retrieving data <button @click="getNames"
      >try again</button></div>
  </div>
</template>

<script>
export default {
  name: "Preview",
  props: {
    text: { type: String }
  },
  data: () => ({
    convertedText: "",
    names: null,
    errors: [],
    loading: false,
    errorWithGetData: false
  }),
  methods: {
    async getNames() {
      this.errorWithGetData = false;
      this.loading = true;
      await this.$http
        .get("/coins")
        .then(response => {
          this.names = response.data.reduce((obj, item) => {
            obj[item.symbol] = item.name;
            return obj;
          }, {});
          this.loading = false;
        })
        .catch(() => {
          this.errorWithGetData = true;
          this.loading = false;
        });
    },
    convertTextFromEditor() {
      this.convertedText = this.text;
      const allTags = this.text.match(/{{(.*?)}}/g);
      if (!this.errorWithGetData) {
        if (!this.names && allTags) {
          this.loading = true;
        } else {
          this.errors = [];
          this.loading = false;
          if (allTags) {
            allTags.forEach(tag => {
              const tagWithoutBrackets = tag.substr(2, tag.length - 4).trim();
              const splitedTag = tagWithoutBrackets.split("/");
              if (
                splitedTag.length !== 2 ||
                tagWithoutBrackets.includes("{{") ||
                tagWithoutBrackets.includes("}}")
              ) {
                this.errors.push(
                  `<strong>"${tagWithoutBrackets}"</strong>: Wrong tag format`
                );
              } else if (splitedTag[0] === "Name") {
                const name = this.names[splitedTag[1]];
                if (!name) {
                  this.errors.push(
                    `<strong>"${tagWithoutBrackets}"</strong>: Wrong symbol`
                  );
                } else {
                  this.convertedText = this.convertedText.replace(tag, name);
                }
              } else {
                this.errors.push(
                  `<strong>"${tagWithoutBrackets}"</strong>: Wrong method name`
                );
              }
            });
          }
        }
      }
    }
  },
  created() {
    this.getNames();
    this.convertTextFromEditor();
  },
  watch: {
    text() {
      this.convertTextFromEditor();
    },
    names() {
      this.convertTextFromEditor();
    }
  }
};
</script>

<style scoped>
textarea {
  width: 100%;
}
.error {
  color: darkred;
  text-align: left;
}
.loading {
  text-align: left;
}
.loading img {
  bottom: -7px;
  height: 30px;
  margin-right: 5px;
  position: relative;
}
</style>
