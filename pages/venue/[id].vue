<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 p-4">
    <div v-if="venueData" class="max-w-4xl w-full bg-base-100 shadow-xl rounded-lg overflow-hidden">
      <figure class="w-full h-64 md:h-80">
        <img :src="getImgUrl(venueData.imageUrl)" alt="场地图片" class="w-full h-full object-cover"/>
      </figure>
      <div class="p-6 text-center">
        <h1 class="text-3xl font-bold mb-4">{{ venueData.name }}</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p class="text-lg"><span class="font-semibold">位置:</span> {{ venueData.location }}</p>
            <p class="text-lg"><span class="font-semibold">容量:</span> {{ venueData.capacity }} 人</p>
          </div>
          <div>
            <p class="text-lg"><span class="font-semibold">价格:</span> {{ venueData.pricePerHour }} 元/小时</p>
            <p class="text-lg"><span class="font-semibold">状态:</span>
              {{ venueData.status === 'available' ? '可用' : '不可用' }}</p>
          </div>
        </div>
        <div class="flex flex-col items-center gap-4">
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">开始时间</span>
            </label>
            <input v-model="bookingForm.startDate" type="datetime-local" class="input input-bordered w-full"/>
          </div>
          <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text">结束时间</span>
            </label>
            <input v-model="bookingForm.endDate" type="datetime-local" class="input input-bordered w-full"/>
          </div>
          <button @click="submitBooking" class="btn btn-primary w-full max-w-xs">立即预约</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import * as Venue from '~/api/Venue';

let {user} = useUserStore();

definePageMeta({
  layout: 'frontend',
});

const {id} = useRoute().params;
const venueData = ref<Venue.VenueItem | undefined>();
const bookingForm = ref<Venue.CreateBookForm>({
  venueID: Number(id),
  startDate: '',
  endDate: '',
});
const {successToast, errorToast} = useToastStore();

onMounted(() => {
  initData();

});

async function initData() {
  const {data} = await Venue.list({id: Number(id)});
  venueData.value = data.data[0];
}

function getImgUrl(name: string) {
  return Venue.getImgUrl(name);
}

function formatDateTime(dateTime: string) {
  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


async function submitBooking() {
  if (!bookingForm.value.startDate || !bookingForm.value.endDate) {
    errorToast('请选择完整的预约时间段');
    return;
  }
  try {
    const formattedStartDate = formatDateTime(bookingForm.value.startDate);
    const formattedEndDate = formatDateTime(bookingForm.value.endDate);

    let {data} = await Venue.createBook({
      venueID: bookingForm.value.venueID,
      bookingDate: formattedStartDate,
      bookingDateEnd: formattedEndDate,
      status: 'pending',
      userID: Number(user.value.userID),
    });
    console.log(data.code,data.message)
    if (data.code == 200) {
      successToast(data.message);
      bookingForm.value.startDate = '';
      bookingForm.value.endDate = '';
      navigateTo('/venue')
    } else {
      errorToast(data.message);
    }
  } catch (error) {
    // errorToast('预约失败，请稍后重试');
  }
}
</script>