<template>
  <div
    class="card card-side bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300"
  >
    <!-- 图片部分 -->
    <figure class="w-1/3 sm:w-1/4 flex-shrink-0">
      <img
        :src="Event.getImgUrl(event.imageUrl)"
        :alt="event.name"
        class="h-full w-full object-cover"
      />
    </figure>

    <!-- 内容部分 -->
    <div class="card-body p-4">
      <!-- 赛事名称 -->
      <h2 class="card-title text-xl font-bold text-primary">
        {{ event.name }}
      </h2>

      <!-- 赛事描述 -->
      <p class="text-sm text-gray-600 line-clamp-2">{{ event.description }}</p>

      <!-- 赛事时间 -->
      <div class="flex items-center text-sm text-gray-500">
        <span class="mr-2">📅</span>
        <span
          >{{ formatDate(event.startDate) }} -
          {{ formatDate(event.endDate) }}</span
        >
      </div>

      <!-- 赛事地点 -->
      <div class="flex items-center text-sm text-gray-500">
        <span class="mr-2">📍</span>
        <span>{{ event.location }}</span>
      </div>

      <!-- 赛事状态和查看次数 -->
      <div class="flex items-center justify-between mt-2">
        <!-- 查看次数 -->
        <div class="items-center text-sm text-gray-500">
          <div class="badge badge-outline mr-2" :class="statusColor">
            {{ event.status }}
          </div>
          <span>{{ event.views }} 次查看</span>
        </div>
        <button class="btn btn-primary btn-sm">查看比赛</button>
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

// 根据赛事状态设置颜色
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

// 格式化日期
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
</script>

<style scoped>
/* 响应式布局 */
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
