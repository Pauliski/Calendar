<template>
  <div class="m-auto">
    <h1 class="text-2xl my-2 text-center">Vue Calendar</h1>
    <section class="mx-5 flex justify-between">
      <h2 class="font-bold">{{ currentMonthName }}</h2>
      <h2 class="font-bold">{{ currentYear }}</h2>
    </section>

    <section class="flex">
      <p
        v-for="day in days"
        :key="day"
        class="p-2 h-10 text-center"
        style="width: 14.28%"
      >
        {{ day }}
      </p>
    </section>
    <section class="flex flex-wrap my-2">
      <p
        v-for="num in startDay()"
        :key="num"
        class="p-2 h-10 text-center"
        style="width: 14.28%"
      ></p>
      <p
        v-for="num in daysInMonth()"
        :key="num"
        class="p-2 h-10 text-center"
        style="width: 14.28%"
        :class="currentDate(num)"
      >
        {{ num }}
      </p>
    </section>
    <section class="flex justify-between my-5 mx-5">
      <button
        class="px-3 py-1 border rounded bg-blue-600 text-white font-bold"
        @click="previous"
      >
        Prev
      </button>
      <button
        class="px-3 py-1 border rounded bg-blue-600 text-white font-bold"
        @click="next"
      >
        Next
      </button>
    </section>
    <section class="my-10 mx-5">
      <form @submit.prevent="handleCustom">
        <fieldset class="border rounded p-3 md:w-1/2">
          <legend class="font-bold">Custom Search</legend>
          <input
            type="number"
            v-model.lazy="customMonth"
            class="w-1/3 md:w-1/3 px-2 py-1 border rounded"
            placeholder="Enter month"
            min="1"
            max="12"
            required
          />
          <input
            type="number"
            v-model.lazy="customYear"
            class="w-1/3 md:w-1/3 px-2 py-1 mx-2 border rounded"
            placeholder="Enter Year"
            min="1900"
            max="9999"
            required
          />
          <button
            type="submit"
            class="px-3 py-1 border rounded bg-blue-600 text-white font-bold"
          >
            Go To
          </button>
        </fieldset>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentMonth: new Date().getMonth(),
      currentYear: new Date().getFullYear(),
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      customMonth: null,
      customYear: null,
    };
  },
  methods: {
    daysInMonth() {
      return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    },
    startDay() {
      return new Date(this.currentYear, this.currentMonth, 1).getDay();
    },
    next() {
      if (this.currentMonth === 11) {
        this.currentYear++;
        this.currentMonth = 0;
      } else {
        this.currentMonth = this.currentMonth + 1;
      }
    },
    previous() {
      if (this.currentMonth === 0) {
        this.currentYear--;
        this.currentMonth = 11;
      } else {
        this.currentMonth = this.currentMonth - 1;
      }
    },
    currentDate(num) {
      const calendarFullMonth = new Date(
        this.currentYear,
        this.currentMonth,
        num
      ).toDateString();
      const currentFullDate = new Date().toDateString();
      return calendarFullMonth === currentFullDate
        ? "text-white rounded-full bg-blue-600"
        : "";
    },
    handleCustom() {
      this.currentMonth = this.customMonth - 1;
      this.currentYear = this.customYear;
    },
  },
  computed: {
    currentMonthName() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString(
        "default",
        { month: "long" }
      );
    },
  },
};
</script>

<style></style>
