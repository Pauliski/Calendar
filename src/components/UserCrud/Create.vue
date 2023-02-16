<template>
  <button class="px-2 py-1 border rounded m-4" @click="newUserModal">
    Add User
  </button>
  <teleport to="body">
    <Modal v-if="isModalOpen" @close="isModalOpen = false" title="Add New User">
      <template #title> Add New User </template>
      <template #body>
        <form @submit.prevent="submit">
          <div class="p-2">
            <label>Name</label>
            <input
              class="w-full p-2 border rounded"
              type="text"
              placeholder="User Name"
              v-model="state.form.name"
            />
          </div>
          <div class="p-2">
            <label>Email</label>
            <input
              class="w-full p-2 border rounded"
              type="email"
              placeholder="User Email"
              v-model="state.form.email"
            />
          </div>
          <div class="p-2">
            <label>Avatar</label>
            <input
              class="w-full p-2 border rounded"
              type="text"
              placeholder="Avatar url"
              v-model="state.form.avatar"
            />
          </div>
          <div class="p-2" v-if="isNewUser">
            <input
              class="w-full p-2 border rounded hover:bg-gray-300"
              @click.prevent="submit"
              value="Create"
            />
          </div>
          <div class="p-2" v-else>
            <input
              class="w-full p-2 border rounded hover:bg-gray-300"
              @click.prevent="update"
              value="Update"
            />
          </div>
        </form>
      </template>
    </Modal>
  </teleport>
</template>

<script>
import { ref, reactive } from "vue";
import Modal from "../Modal.vue";
import axios from "../../plugins/axios";
export default {
  props: {
    formData: {
      type: Object,
      required: false,
      default(rawProps) {
        console.log(rawProps);
        return { name: "", email: "", avatar: "" };
      },
    },
  },
  components: { Modal },
  setup(_, { emit }) {
    const isModalOpen = ref(false);
    const isNewUser = ref(false);
    const defaultFormValue = {
      name: "",
      email: "",
      avatar: "",
    };
    const state = reactive({
      users: [],
      page: 1,
      form: {
        name: "",
        email: "",
        avatar: "",
      },
    });
    function newUserModal() {
      state.form.email = "";
      state.form.avatar = "";
      state.form.name = "";
      state.form.id = "";
      isModalOpen.value = true;
      isNewUser.value = true;
    }
    async function submit() {
      const { data } = await axios.post("/users", state.form);
      emit("newUserAdded", data);
      state.form = defaultFormValue;
      isModalOpen.value = false;
    }
    async function edit(formData) {
      isModalOpen.value = true;
      isNewUser.value = false;
      state.form.email = formData.email;
      state.form.avatar = formData.avatar;
      state.form.name = formData.name;
      state.form.id = formData._id;
    }
    async function update() {
      const { name, email, avatar, id } = state.form;
      const { data } = await axios.put(`/users/${id}`, {
        name,
        email,
        avatar,
      });
      console.log(data);
      const updatedData =  {name, email, avatar, id}
       emit("updateUser", updatedData);
      state.form.email = "";
      state.form.avatar = "";
      state.form.name = "";
      state.form.id = "";
      isModalOpen.value = false;
    }

    return {
      state,
      isModalOpen,
      submit,
      newUserModal,
      isNewUser,
      edit,
      update,
    };
  },
};
</script>

<style></style>
