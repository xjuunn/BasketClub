<template>
  <div
    class="card card-side bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300"
  >
    <figure class="w-1/3 sm:w-1/4 flex-shrink-0">
      <img
        :src="Event.getImgUrl(event.imageUrl)"
        :alt="event.name"
        class="h-full w-full object-cover"
      />
    </figure>

    <div class="card-body p-4">
      <h2 class="card-title text-xl font-bold text-primary">
        {{ event.name }}
      </h2>

      <p class="text-sm text-gray-600 line-clamp-2">{{ event.description }}</p>

      <div class="flex items-center text-sm text-gray-500">
        <span class="mr-2">📅</span>
        <span
          >{{ formatDate(event.startDate) }} -
          {{ formatDate(event.endDate) }}</span
        >
      </div>

      <div class="flex items-center text-sm text-gray-500">
        <span class="mr-2">📍</span>
        <span>{{ event.location }}</span>
      </div>
      <div class="flex items-center justify-between mt-2">
        <div class="items-center text-sm text-gray-500">
          <div class="badge badge-outline mr-2" :class="statusColor">
            {{ event.status }}
          </div>
          <span>{{ event.views }} 次查看</span>
        </div>
        <button class="btn btn-primary btn-sm" @click="btnView">
          查看比赛
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import * as Event from "~/api/Event";
const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});

const statusColor = computed(() => {
  switch (props.event.status) {
    case "finished":
      return "badge-error";
    case "upcoming":
      return "badge-success";
    case "ongoing":
      return "badge-warning";
    default:
      return "badge-info";
  }
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

async function btnView() {
  let { data } = await Event.addView(props.event.eventID);
  navigateTo("/event/" + props.event.eventID);
}
</script>

<style scoped>
@media (max-width: 640px) {
  .card {
    flex-direction: column;
  }
  figure {
    width: 100%;
    height: 150px;
  }
  .card-body {
    padding: 1rem;
  }
}
</style>
