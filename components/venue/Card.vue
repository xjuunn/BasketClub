<template>
  <div
    class="card bg-base-300 shadow-xl hover:shadow-2xl transition-shadow duration-300"
  >
    <figure class="relative h-48 md:h-64 overflow-hidden">
      <img
        :src="Venue.getImgUrl(venue.imageUrl ?? '')"
        :alt="venue.name"
        class="w-full h-full object-cover"
      />
      <div
        class="absolute top-2 right-2 badge"
        :class="{
          'badge-success': venue.status === 'available',
          'badge-error': venue.status === 'unavailable',
        }"
      >
        {{ venue.status === "available" ? "可用" : "不可用" }}
      </div>
    </figure>
    <div class="card-body p-4 md:p-6">
      <h2 class="card-title text-lg md:text-xl font-bold text-base-content">
        {{ venue.name }}
      </h2>
      <p class="text-sm md:text-base text-base-content/80 flex items-center">
        <span class="mr-2">📍</span>
        {{ venue.location }}
      </p>
      <p class="text-sm md:text-base text-base-content/80 flex items-center">
        <span class="mr-2">👥</span>
        容量：{{ venue.capacity }} 人
      </p>
      <p class="text-sm md:text-base text-base-content/80 flex items-center">
        <span class="mr-2">💰</span>
        每小时价格：{{ venue.pricePerHour.toFixed(2) }} 元
      </p>
      <p class="text-sm md:text-base text-base-content/80 mt-2 line-clamp-1">
        {{ venue.description }}
      </p>
      <div class="card-actions justify-end mt-4">
        <button class="btn btn-primary btn-sm md:btn-md">立即预约</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  venue: {
    type: Object,
    required: true,
  },
});
import * as Venue from "../../api/Venue";
</script>

<style scoped>
figure img {
  transition: transform 0.3s ease;
}

figure:hover img {
  transform: scale(1.1);
}
</style>
