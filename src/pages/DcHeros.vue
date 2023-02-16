<template>
  <div class="m-auto">
    <h1 class="text-2xl text-center">DC Heroes {{ herosCount }}</h1>
    <ul>
      <li
        class="flex justify-between my-1"
        v-for="(hero, index) in heroes"
        :key="index"
      >
        <div>{{ hero }}</div>
        <button
          @click="removeHero(index)"
          class="cursor-pointer border rounded px-2 bg-red-600 text-white"
        >
          x
        </button>
      </li>
    </ul>
    <form class="mt-10" @submit.prevent="addHero">
      <input
        class="border rounded py-1 px-2"
        type="text"
        placeholder="Enter your hero"
        v-model.lazy="newHero"
        ref="newHeroRef"
      />

      <button
        class="border rounded p-2 ml-2 bg-blue-600 text-sm text-white"
        type="submit"
        :disabled="isDisabled"
      >
        Add hero
      </button>
    </form>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
export default {
  setup() {
    const newHeroRef = ref("");
    const newHero = ref("");
    const isDisabled = false;
    const heroes = ref([
      "Superman",
      "Batman",
      "Power rangers",
      "Raiden",
      "Arrow",
      "Flash",
    ]);
    onMounted(() => {
      newHeroRef.value.focus();
    });
    const herosCount = computed({
      get: () => heroes.value.length,
    });
    function removeHero(index) {
      heroes.value = heroes.value.filter((hero, i) => i !== index);
    }
    function addHero() {
      heroes.value.push(newHero.value);
      newHero.value = "";
    }
    return {
      heroes,
      newHero,
      isDisabled,
      removeHero,
      addHero,
      newHeroRef,
      herosCount,
    };
  },
};
</script>

<style></style>
