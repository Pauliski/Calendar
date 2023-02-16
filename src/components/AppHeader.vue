<template>
  <nav
    class="w-full bg-gradient-to-r from-blue-800 to-blue-600 block sm:hidden text-white px-4 py-2 items-center "
  >
    <button class="w-10 h-10">
      <img src="../assets/hambu.png" alt="hamburger" class="w-full" />
    </button>
  </nav>
  <nav
    class="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-2 flex sm:items-center flex-col sm:flex-row"
  >
    <router-link
      v-for="item in list"
      :key="item.to"
      :to="item.to"
      class="mx-2"
      >{{ item.title }}</router-link
    >
    <button v-if="isLoggedIn" class="mx-2" @click="logout">Logout</button>
    <button v-else class="mx-2" @click="openLogin">Login</button>
  </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import appCredential from "../utilities/firebase";
export default {
  data() {
    return {
      list: [
        {
          title: "DC Heros",
          to: "/heros",
        },
        {
          title: "Calendar",
          to: "/calendar",
        },
        {
          title: "Markdown",
          to: "/markdown",
        },
        {
          title: "Slider",
          to: "/slider",
        },
        {
          title: "Calculator",
          to: "/calculator",
        },
        {
          title: "Modal",
          to: "/modal",
        },
        {
          title: "Chat",
          to: "/chat",
        },
        {
          title: "User Crud",
          to: "/user-crud",
        },
      ],
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  methods: {
    logout() {
      const auth = getAuth(appCredential);
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
    openLogin() {
      this.$store.commit("setLoginModal", true);
    },
  },
};
</script>

<style></style>
