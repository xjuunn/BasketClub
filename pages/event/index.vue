<template>
  <div class="flex flex-col items-center">
    <div class="text-2xl text-center font-bold m-3">场地预约</div>
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
definePageMeta({
  layout: "frontend",
});
import * as Event from "~/api/Event";
let listdata: Ref<Event.EventItem[]> = ref([]);
onMounted(() => {
  initList();
});

async function initList() {
  let { data } = await Event.list({});
  listdata.value = data.data;
}
</script>
