<template>
  <AppHeader :isLoggedIn="isLoggedIn" @open-login-modal="isLoginOpen = true" />
  <div class="w-full flex">
    <router-view></router-view>
  </div>
  <teleport to="body">
    <LoginModal v-if="isLoginOpen" @close-login="isLoginOpen = false" />
  </teleport>
  
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AppHeader from "./components/AppHeader";
import LoginModal from "./components/LoginModal";

import appCredential from "./utilities/firebase"
export default {
   data(){
        return{
            isLoginOpen: false,
            isLoggedIn: false,
            authUser: [],
        }
    },
    mounted(){


const auth = getAuth(appCredential);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // const uid = user.uid;
    this.isLoggedIn = true;
    this.authUser = user;
    // ...
  } else {
    this.isLoggedIn = false;
    this.authUser = {}
  }
});
    },
  components: { AppHeader, LoginModal },
};
</script>

<style></style>
