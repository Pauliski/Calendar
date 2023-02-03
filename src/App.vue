<template>
  <AppHeader />
  <div class="w-full flex">
    <router-view></router-view>
  </div>
  <teleport to="body">
    <LoginModal  />
  </teleport>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppHeader from "./components/AppHeader";
import LoginModal from "./components/LoginModal";

import appCredential from "./utilities/firebase";
export default {
  mounted() {
    const auth = getAuth(appCredential);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // const uid = user.uid;
        this.$store.commit("setIsloggedIn", true);
        this.$store.commit("setAuthUser", user);
        // ...
      } else {
        this.$store.commit("setIsloggedIn", false);
        this.$store.commit("setAuthUser", {});
      }
    });
  },
  components: { AppHeader, LoginModal },
};
</script>

<style></style>
