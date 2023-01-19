<template>
  <section class="mt-5 text-center">
    <button class="border px-2 rounded" @click="loginWithGoogle">
      Login with Google
    </button>
  </section>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import appCrendential from "../../utilities/firebase";
export default {
  methods: {
    loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      console.log(provider);

      const auth = getAuth(appCrendential);
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          
          console.log(credential);
          // The signed-in user info.
          this.$emit("close-login-google");
          // ...
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
