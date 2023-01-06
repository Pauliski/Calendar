<template>
  <div class="m-auto">
      <h1 class="text-2xl text-center">DC Heroes {{ herosCount }}</h1>
      <ul >
        <li class="flex justify-between" v-for="(hero, index) in heroes" :key="index">
          <div>{{ hero }} </div>
          <button @click="removeHero(index)">x</button>
        </li>
        
      </ul>
      <!-- <input type="text" :value="firstName" /> -->
      <!-- <p>Your name is {{ firstName }} {{ lastName }}</p> -->
      <form class="mt-10" @submit.prevent="addHero">
        <input
        class="border rounded py-1 px-2"
          type="text"
          placeholder="Enter your hero"
          v-model.lazy="newHero"
        />
        <!-- <button class="border rounded bg-gradient-to-r from-pink-700 to-red-500 text-sm text-white" v-on:click="removeHero">Remove hero</button> -->
        <button class="border rounded p-2 ml-2 bg-blue-600 text-sm text-white" type="submit" :disabled="isDisabled">Add hero</button>
      </form>
    </div>
</template>

<script>
export default {
data() {
    return {
      heroes: [
        "Superman",
        "Batman",
        "Power rangers",
        "Raiden",
        "Arrow",
        "Flash",
      ],
      newHero: "",
      isDisabled: false,
    };
  },
  computed: {
    herosCount() {
      return this.heroes.length;
    },
  },
  methods: {
    addHero() {
      this.heroes.push(this.newHero);
      this.newHero = "";
    },
    removeHero(index) {
      this.heroes = this.heroes.filter((hero, i) => i !== index);
    },
  },
}
</script>

<style>

</style>