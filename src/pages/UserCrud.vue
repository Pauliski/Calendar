<template>
  <section class="flex w-full">
    <div class="m-auto">
      <div class="mt-10">
        <Create
          @newUserAdded="addUser"
          @updateUser="updateUser"
          ref="createRef"
          formData="{ name: '', email: '', avatar:  }"
        />
        <table>
          <thead>
            <tr>
              <th class="px-4 py-2 border">id</th>
              <th class="px-4 py-2 border">Avatar</th>
              <th class="px-4 py-2 border">Name</th>
              <th class="px-4 py-2 border">Email</th>
              <th class="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in state.users" :key="user._id">
              <td class="border px-4 py-2">{{ user._id }}</td>
              <td class="border px-4 py-2">
                <img
                  width="50"
                  class="rounded-full"
                  :src="user.avatar"
                  :alt="user.first_name"
                />
              </td>
              <td class="border px-4 py-2">{{ user.name }}</td>
              <td class="border px-4 py-2">{{ user.email }}</td>
              <td class="border px-4 py-2">
                <button
                  class="px-2 py-1 bg-red-500 text-white rounded"
                  @click="delete remove(user._id)"
                >
                  Delete
                </button>
                <button
                  class="px-2 py-1 bg-green-500 text-white rounded"
                  @click="update(user)"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="flex justify-between">
          <button
            class="px-3 py-2 border rounded cursor-pointer"
            :class="state.page === 1 ? 'bg-gray-100' : 'hover:shadow'"
            @click="prev"
            :disabled="state.page === 1"
          >
            Prev
          </button>
          <button
            class="px-3 py-2 border rounded cursor-pointer"
            :class="state.page === 2 ? 'bg-gray-100' : 'hover:shadow'"
            @click="next"
            :disabled="state.page === 2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import axios from "../plugins/axios";
import Create from "../components/UserCrud/Create";

export default {
  components: { Create },
  setup() {
    const createRef = ref("");

    const state = reactive({
      users: [],
      page: 1,
    });
    onMounted(async () => {
      const { data } = await axios.get(`/users`);
      state.users = data;
    });
    async function prev() {
      if (state.page > 1) {
        state.page -= 1;
        const { data } = await axios.get(`/users?page=${state.page}`);
        state.users = data;
      }
    }
    async function next() {
      if (state.page <= 1) {
        state.page += 1;
        const { data } = await axios.get(`/users?page=${state.page}`);
        state.users = data;
      }
    }

    async function remove(id) {
      await axios.delete(`/users/${id}`);
      state.users = state.users.filter((user) => user._id !== id);
    }
    function addUser(data) {
      state.users.push(data);
    }
    function update(data) {
      createRef.value.edit(data);
    }
    function updateUser(data) {
      const userToEdit = state.users.findIndex((user) => user._id == data.id);
      state.users[userToEdit] = { ...state.users[userToEdit], ...data };
    }
    return {
      state,
      prev,
      next,
      remove,
      addUser,
      update,
      updateUser,
      createRef,
    };
  },
};
</script>

<style></style>
