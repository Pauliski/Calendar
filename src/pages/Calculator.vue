<template>
  <section class="flex w-full justify-center">
    <div class="bg-black rounded pt-2 px-5 pb-10 mt-5 w-80 max-w-sm">
      <h1 class="text-2xl text-right mb-5 text-white">Calculator</h1>
      <section
        class="bg-[#baca86] rounded px-1 mb-5 overflow-x-scroll scrollbar-hide"
      >
        <p class="text-2xl text-left h-5">
          {{ prevNumber }} {{ selectedOperation }} {{ currentNumber }}
        </p>
        <p class="h-5 mt-5 text-right" style="direction: ltr">
          {{ answer }}
        </p>
      </section>

      <div class="grid grid-cols-4 gap-2">
        <button
          @click="pressed('1')"
          class="p-2 border rounded w-15 h-15 shadow bg-white font-bold"
        >
          1
        </button>
        <button
          @click="pressed('2')"
          class="p-2 border rounded w-15 h-15 shadow bg-white font-bold"
        >
          2
        </button>
        <button
          @click="pressed('3')"
          class="p-2 border rounded w-15 h-15 shadow bg-white font-bold"
        >
          3
        </button>
        <button
          @click="pressed('+')"
          class="p-2 border rounded w-15 h-15 shadow bg-white font-bold"
        >
          +
        </button>
        <button
          @click="pressed('4')"
          class="p-2 border rounded w-15 h-15 shadow bg-white font-bold"
        >
          4
        </button>
        <button
          @click="pressed('5')"
          class="p-2 border rounded w-15 h-15 shadow bg-white font-bold"
        >
          5
        </button>
        <button
          @click="pressed('6')"
          class="p-2 border rounded w-15 h-15 shadow bg-white font-bold"
        >
          6
        </button>
        <button
          @click="pressed('-')"
          class="p-2 border rounded w-15 h-15 shadow bg-white font-bold"
        >
          -
        </button>
        <button
          @click="pressed('7')"
          class="p-2 border rounded w-15 h-15 shadow bg-white font-bold"
        >
          7
        </button>
        <button
          @click="pressed('8')"
          class="p-2 border rounded w-15 h-15 shadow bg-white font-bold"
        >
          8
        </button>
        <button
          @click="pressed('9')"
          class="p-2 border rounded w-15 h-15 shadow bg-white font-bold"
        >
          9
        </button>
        <button
          @click="pressed('*')"
          class="p-2 border rounded w-15 h-15 shadow bg-white font-bold"
        >
          x
        </button>
        <button
          @click="pressed('0')"
          class="p-2 border rounded h-15 shadow w-15 bg-white"
        >
          0
        </button>
        <button
          @click="pressed('c')"
          class="p-2 border rounded w-15 h-15 shadow bg-white font-bold"
        >
          C
        </button>
        <button
          class="p-2 border rounded w-15 h-15 shadow bg-white font-bold"
          @click="calculate()"
        >
          =
        </button>
        <button
          @click="pressed('/')"
          class="p-2 border rounded w-15 h-15 shadow bg-white font-bold"
        >
          /
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
export default {
  setup() {
    const currentNumber = ref("");
    const prevNumber = ref("");
    let answer = ref("");
    const selectedOperation = ref("");
    const operations = ["+", "-", "*", "/"];
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    function pressed(value) {
      if (value === "=" || value === "Enter") {
        calculate();
        answer.value = currentNumber.value;
      } else if (operations.includes(value)) {
        applyOperation(value);
      } else if (value === "c") {
        currentNumber.value = "";
        prevNumber.value = "";
        answer.value = "";
        selectedOperation.value = "";
      } else if (numbers.includes(value)) {
        if (answer.value === currentNumber.value) {
          currentNumber.value = "";
          answer.value = "";
        }
        appendNumber(value);
      }
    }
    function appendNumber(value) {
      currentNumber.value = currentNumber.value + value;
      handleAnswer();
    }
    function applyOperation(value) {
      calculate();
      prevNumber.value = currentNumber.value;
      currentNumber.value = "";
      selectedOperation.value = value;
    }
    function calculate() {
      if (selectedOperation.value === "*") {
        currentNumber.value = prevNumber.value * currentNumber.value;
      }
      if (selectedOperation.value === "/") {
        currentNumber.value = prevNumber.value / currentNumber.value;
      }
      if (selectedOperation.value === "+") {
        currentNumber.value = +prevNumber.value + +currentNumber.value;
      }
      if (selectedOperation.value === "-") {
        currentNumber.value = +prevNumber.value - +currentNumber.value;
      }
      prevNumber.value = "";
      selectedOperation.value = "";
    }
    function handleAnswer() {
      if (selectedOperation.value === "*") {
        answer.value = prevNumber.value * currentNumber.value;
      }
      if (selectedOperation.value === "/") {
        answer.value = prevNumber.value / currentNumber.value;
      }
      if (selectedOperation.value === "+") {
        answer.value = +prevNumber.value + +currentNumber.value;
      }
      if (selectedOperation.value === "-") {
        answer.value = +prevNumber.value - +currentNumber.value;
      }
    }
    function handleKeydown(e) {
      pressed(e.key);
    }
    onMounted(() => {
      window.addEventListener("keydown", handleKeydown);
    });
    onUnmounted(() => {
      window.removeEventListener("keydown", handleKeydown);
    });
    return {
      currentNumber,
      pressed,
      appendNumber,
      applyOperation,
      selectedOperation,
      prevNumber,
      calculate,
      answer,
    };
  },
};
</script>

<style></style>
