<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="text-2xl my-5">Reuseable Modal</h1>
      <Modal v-if="isModalOpen" @close="isModalOpen = false" >
        <template v-slot:title>Red modal</template>
        <template #body>
          <h1>Adeyemi</h1>
        </template>
      </Modal>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import Modal from "../components/Modal.vue";
export default {
  components: { Modal },
  setup() {
    const isModalOpen = ref(true);
    return { isModalOpen };
  },
};
</script>

<style></style>
