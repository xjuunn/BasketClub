<template>
  <div>
    <div class="absolute z-10 bg w-full h-[calc(100vh-70px)] transition transform-[rotate(90deg)] md:transform-[rotate(0deg)]"></div>
    <div class="absolute w-full h-[calc(100vh-70px)] z-30">
      <div class=" w-full h-[800px]" >
        <Basket3D />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Basket3D from "~/components/index/Basket3D.vue";

definePageMeta({
  layout: "frontend",
});
</script>
<style lang="css" scoped>
.bg {
  background-image: url(../assets/arealine.min.svg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
