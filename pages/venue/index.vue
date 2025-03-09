<template>
  <div class="flex flex-col items-center">
    <div class="text-2xl text-center font-bold m-3">场地预约</div>
    <div
      class="p-2 container grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
    >
      <VenueCard
        v-for="(item, index) in listdata"
        :key="item.venueID"
        :venue="item"
      ></VenueCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "frontend",
});

import * as Venue from "~/api/Venue";
let listdata: Ref<Venue.VenueItem[]> = ref([]);
onMounted(() => {
  initList();
});
async function initList() {
  let { data } = await Venue.list({});
  listdata.value = data.data;
}
</script>
