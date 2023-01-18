<template>
  <section
    @click="close"
    class="z-20 h-screen w-screen bg-gray-500 fixed top-0 opacity-50"
  ></section>
  <div class="absolute inset-0">
    <div class="flex h-full">
      <div class="z-30 m-auto bg-white p-2 rounded shadow">
        <div class="p-2 border">
          <h1 class="text-xl text-center">Login</h1>
          <Google @close-login-google="close" />

          <p class="text-center my-3">0r</p>
          <form action="" class="p-2 my-2" @submit.prevent="submit">
            <div class="my-4">
              <label for="">Email or Username</label>
              <input
                v-model="formData.email"
                type="text"
                class="rounded shadow p-2 w-full"
                placeholder="Enetr your email or Username"
                ref="emailRef"
              />
            </div>
            <div class="my-4">
              <label for="">Password</label>
              <input
                v-model="formData.password"
                type="password"
                class="rounded shadow p-2 w-full"
                placeholder="Enter your password"
              />
            </div>
            <div class="my-4">
              <button
                type="submit"
                class="w-full rounded shadow-md p-2 ml-2 bg-blue-600 text-sm text-white"
              >
                <span v-if="!isLoading">Login</span>
                <span v-else>⌛</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import appCredential from "../utilities/firebase";
import Google from "./Login/Google";
export default {
  components: { Google },
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      isLoading: false,
    };
  },
  mounted() {
    this.$refs.emailRef.focus();
  },
  methods: {
    submit() {
      this.isLoading = true;
      const auth = getAuth(appCredential);
      signInWithEmailAndPassword(
        auth,
        this.formData.email,
        this.formData.password
      )
        .then((userCredential) => {
          // Signed in
          this.formData.email = "";
          this.formData.password = "";
          console.log(userCredential);
          this.isLoading = false;
          this.close();
        })
        .catch((error) => {
          console.log("this is an error ", error);
          this.isLoading = false;
        });
    },
    close() {
      this.$emit("close-login");
    },
    
  },
};
</script>

<style></style>
