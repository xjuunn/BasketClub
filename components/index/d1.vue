<template>
  <div class="w-full h-full">
    <div
        class="absolute z-10 bg w-full h-[90vh] transition transform-[rotate(90deg)] md:transform-[rotate(0deg)]"
      ></div>
    <div class="w-full h-full z-30">
      <div class="relative md:grid md:grid-cols-3 ">
        <div class="h-[90vh] z-20 absolute md:static md:order-2 w-full flex-1 lg:pr-72">
          <Basket3D />
        </div>
        <div
          class="absolute z-30 md:static md:order-1 md:col-span-2 w-full h-[90vh] flex items-center justify-center lg:pl-32"
        >
          <div class="text-center space-y-6 mt-20 md:mt-0">
            <h1
              class="text-4xl md:text-6xl font-bold pb-52 md:pb-0 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient"
            >
              “投”你所好， “约”你所想！
            </h1>

            <p
              class="text-lg md:text-xl text-base-content max-w-2xl mt-32 md:mt-0 opacity-0 animate-fade-in"
            >
              我们致力于通过智能预约、场地分配、数据统计等功能，帮助篮球场馆更高效地管理资源，同时让篮球爱好者享受到更加便捷的预约服务。
            </p>

            <div class="space-x-4">
              <button @click="navigateTo('/venue')"
                class="btn btn-primary hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
              >
                立即预约
              </button>
              <button @click="navigateTo('/event')"
                class="btn btn-outline btn-secondary hover:bg-secondary hover:text-white transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                热门比赛
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Basket3D from "~/components/index/Basket3D.vue";
</script>
<style lang="css" scoped>
.bg {
  background-image: url(../../assets/arealine.min.svg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 5s ease infinite;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1.5s ease forwards;
  animation-delay: 0.5s;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 5s ease infinite;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1.5s ease forwards;
  animation-delay: 0.5s;
}
</style>
