<template>
  <div class="flex w-full flex-wrap pb-4 relative">
    <div v-for="(color, index) in sliders" class="w-full absolute" :key="color">
      <transition name="fade">
        <div
          v-if="currentSlide === index"
          :class="color"
          style="height: 350px"
        ></div>
      </transition>
    </div>
    <div class="w-full" style="height: 330px">
      <div class="absolute bottom-0 flex justify-center w-full">
        <div
          v-for="(item, index) in sliders"
          @click="makeActive(index)"
          :key="item"
          class="w-4 h-4 mx-2 rounded-full cursor-pointer shadow-md"
          :class="currentSlide === index ? 'bg-gray-700' : 'bg-gray-300' "
        ></div>
      </div>
    </div>
    <!-- <div class="my-10 flex w-full">
      <div class="m-auto">
        <transition name="fade">
          <h1 v-if="isTitleShowing" class="">Carousel Slider</h1>
        </transition>

        <button
          @click="isTitleShowing = !isTitleShowing"
          class="px-2 rounded border"
        >
          Toggle Text
        </button>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      interval: "",
      sliders: ["bg-blue-600", "bg-yellow-600", "bg-teal-600"],
      isTitleShowing: true,
    };
  },
  methods:{
    makeActive(index){
        this.currentSlide = index
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.currentSlide = this.currentSlide === 2 ? 0 : this.currentSlide + 1;
    }, 2000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  /* transition: opacity 0.5s ease; */
  transition: all 1s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
