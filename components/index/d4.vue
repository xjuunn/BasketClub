<template>
  <div
    class="relative w-full bg-base-100 z-40 pt-20 pb-20 flex flex-col justify-center items-center"
  >
    <h2 class="text-2xl font-bold text-center mb-4">热门赛事</h2>
    <div class="container grid grid-cols-1 xl:grid-cols-2 gap-3">
      <EventCard
        v-for="(item, index) in listdata"
        :key="item.eventID"
        :event="item"
      ></EventCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as Event from "~/api/Event";
let listdata: Ref<Event.HotEventItem[]> = ref([]);
onMounted(() => {
  initList();
});

async function initList() {
  let { data } = await Event.hotEvent();
  listdata.value = data.data;
}
</script>
