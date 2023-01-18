<template>
  <div class="flex w-full flex-wrap pb-4">
    <h1 class="w-full text-center text-3xl my-4">Markdown App</h1>
    <section class="flex w-10/12 h-screen m-auto flex-wrap">
      <article class="w-full h-1/2 sm:h-full sm:w-1/2 border">
        <textarea
          class="w-full h-full"
          :value="text"
          @input="update"
          ref="newMarkdownRef"
        ></textarea>
      </article>
      <article
        class="w-full sm:w-1/2 border h-1/2 sm:h-full bg-gray-100"
        v-html="markedText"
      ></article>
    </section>
  </div>
</template>

<script>
import { marked } from "marked";
import debounce from "../utilities/mixins/debounce";
export default {
  mixins: [debounce],
  data() {
    return {
      text: "",
    };
  },
  mounted() {
    this.$refs.newMarkdownRef.focus();
  },
  computed: {
    markedText() {
      return marked(this.text);
    },
  },
  methods: {
    update(e) {
      const task = () => (this.text = e.target.value);
      this.debounce(task, 500);
    },
  },
};
</script>

<style></style>
