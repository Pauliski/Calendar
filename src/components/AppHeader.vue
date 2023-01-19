<template>
  <nav
    class="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white px-4 py-2"
  >
    <router-link
      v-for="item in list"
      :key="item.to"
      :to="item.to"
      class="mx-2"
      >{{ item.title }}</router-link
    >
    <button v-if="isLoggedIn" class="mx-2" @click="logout">Logout</button>
     <button v-else class="mx-2" @click="$emit('open-login-modal')">Login</button>
     
  </nav>
 
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import appCredential from "../utilities/firebase";
export default {
  props: {"isLoggedIn": {type: Boolean, required: false}},
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
      ],
    };
  },
  methods:{
    logout(){
      

const auth = getAuth(appCredential);
signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
  console.log(error)
});

    }
  }
};
</script>

<style></style>
