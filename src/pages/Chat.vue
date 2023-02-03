<template>
  <section class="flex justify-center w-full m-auto">
    <div class="my-5">
      <h1 class="text-2xl">Real Time Chat</h1>
      <div class="border rounded-lg px-3 py-4 mt-2 h-64 p-2">
        <div
          v-for="chat in state.allChats"
          :key="chat.message"
          class="w-full"
          :class="chat.userId === userId ? 'text-left' : 'text-right'"
        >
          {{ chat.message }}
        </div>
      </div>
      <div class="h-8 p-2">
        <input
          v-model="state.message"
          class="p-1 border rounded shadow"
          placeholder="Start Typing..."
          @keydown.enter="addMessage"
        />
      </div>
    </div>
  </section>
</template>

<script>
import {
  push,
  set,
  onChildAdded,
} from "firebase/database";

import { computed, onMounted, reactive } from "vue";
import  {chatRef} from "../utilities/firebase";
import {useStore} from 'vuex'
export default {
  setup() {
    const state = reactive({
      allChats: [],
      message: "",
    });

    const store = useStore()
    const userId = computed(()=> store.state.authUser.uid)

    onMounted(async () => {
      onChildAdded(chatRef, (data) => {
        state.allChats.push({key: data.key, ...data.val()})
        console.log(state.allChats)
      });
    });
    function addMessage() {

      const newChatRef = push(chatRef);
      console.log(newChatRef);

      set(newChatRef, {
        message: state.message,
        userId: state.userId,
      });

      state.message = "";
    }

    return { state, addMessage, userId };
  },
};
</script>

<style></style>
