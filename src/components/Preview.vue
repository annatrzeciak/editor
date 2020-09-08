<template>
  <div>
    <h2>Preview</h2>
    <component :is="convertedText" class="preview" />
    <div class="loading" v-if="loading">
      <img src="/loading.gif" alt="Loading gif" />Data is being loaded, please
      wait
    </div>
    <div class="error" v-for="error in errors" :key="error.id" v-html="error" />
    <div class="error" v-if="errorWithGetData">
      An error occurred while retrieving data
      <button @click="getNames">try again</button>
    </div>
  </div>
</template>

<script>
import Tag from "./Tag";
import TagName from "./TagName";
import TagExchange from "./TagExchange";
import Vue from "vue";
Vue.component("Tag", Tag);
Vue.component("TagName", TagName);
Vue.component("TagExchange", TagExchange);
export default {
  name: "Preview",
  components: { TagName, TagExchange },
  props: {
    text: { type: String }
  },
  data: () => ({
    coins: {},
    exchanges: {},
    errors: [],
    loading: false,
    errorWithGetData: false
  }),
  computed: {
    allUsedTags() {
      const matches = new Set(this.text.match(/{{(.*?)}}/g));
      return [...matches];
    },
    incorrectTags() {
        this.clearErrors();
        if (
        !this.errorWithGetData &&
        this.allUsedTags &&
        this.allUsedTags.length
      ) {
        return this.allUsedTags.filter(tag => {
          const tagWithoutBrackets = tag.substr(2, tag.length - 4).trim();
          const splitedTag = tagWithoutBrackets.split("/");
          if (!this.isCorrectTagFormat(tag)) {
            this.addErrorMessage(
              `<strong>"${tag}"</strong>: Wrong tag format`
            );
            return true;
            // incorrectTags.push(tag);
          } else if (splitedTag[0] !== "Name" && splitedTag[0] !== "Exchange") {
            this.addErrorMessage(
              `<strong>"${tag}"</strong>: Wrong method format`
            );
            return true;
          } else {
            const coin = this.coins[splitedTag[1]];
            if (!coin) {
              this.addErrorMessage(
                `<strong>"${tag}"</strong>: Wrong symbol`
              );
              return true;
            }
          }
        });
      }
      return [];
    },
    correctTags() {
      if (
        !this.errorWithGetData &&
        this.allUsedTags &&
        this.allUsedTags.length
      ) {
        return this.allUsedTags.filter(
          tag => !this.incorrectTags.includes(tag)
        );
      }
      return [];
    },
    convertedText() {
      let html = this.text;
      if (!this.errorWithGetData && this.correctTags.length) {
        for (const tag of this.correctTags) {
          const tagWithoutBrackets = tag.substr(2, tag.length - 4).trim();
          const splitedTag = tagWithoutBrackets.split("/");
          if (splitedTag[0] === "Name") {
            html = html.replace(
              tag,
              `<TagName :tag="'${tag}'" :allCoins="allCoins"/>`
            );
          } else if (splitedTag[0] === "Exchange") {
            html = html.replace(
              tag,
              `<TagExchange :tag="'${tag}'" :allCoins="allCoins" :allExchange="allExchanges"/>`
            );
          }
        }
      }
      if (this.incorrectTags.length) {
        for (const tag of this.incorrectTags) {
          html = html.replace(
            tag,
            `<Tag :tag="'${tag}'"/>`
          );
        }
      }
      return {
        template: `<div>${html}</div>`,
        props: {
          allCoins: {
            type: Object,
            default: () => {
              return this.coins;
            }
          },
          allExchanges: {
            type: Object,
            default: () => {
              return this.exchanges;
            }
          }
        }
      };
    }
  },
  methods: {
    clearErrors() {
      this.errors = [];
    },
    addErrorMessage(message) {
      this.errors.push(message);
    },
    isCorrectTagFormat(tag) {
      const tagWithoutBrackets = tag.substr(2, tag.length - 4).trim();
      const splitedTag = tagWithoutBrackets.split("/");

      return (
        splitedTag.length === 2 &&
        !tagWithoutBrackets.includes("{{") &&
        !tagWithoutBrackets.includes("}}")
      );
    },
    async getNames() {
      this.errorWithGetData = false;
      this.loading = true;
      await this.$http
        .get("/coins")
        .then(response => {
          this.coins = response.data.reduce((obj, item) => {
            obj[item.symbol] = { name: item.name, id: item.id };
            return obj;
          }, {});
          this.loading = false;
        })
        .catch(() => {
          this.errorWithGetData = true;
          this.loading = false;
        });
    }
  },
  created() {
    this.getNames();
  }
};
</script>

<style scoped>
.preview {
  border: 1px solid rgb(118, 118, 118);
  height: 450px;
  width: 100%;
  padding: 2px;
  text-align: left;
  white-space: pre-line;
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
