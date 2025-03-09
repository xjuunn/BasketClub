<template>
  <div class="relative w-full bg-base-100 z-40 pt-20 pb-0 flex flex-col items-center justify-center">
    <h2 class="text-2xl font-bold text-center mb-4">场地预约</h2>
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
import * as Venue from "~/api/Venue";
let listdata: Ref<Venue.VenueItem[]> = ref([]);
onMounted(() => {
  initList();
});
async function initList() {
  let { data } = await Venue.list({});
  listdata.value = data.data.slice(0, 8);
}
</script>
