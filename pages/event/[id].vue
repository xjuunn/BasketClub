<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200 p-4">
    <div v-if="eventData" class="card bg-base-100 shadow-xl w-full max-w-4xl">
      <figure>
        <img
          :src="getImgUrl(eventData.imageUrl)"
          alt="赛事图片"
          class="w-full h-96 object-cover"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title text-3xl font-bold text-primary">
          {{ eventData.name }}
        </h2>
        <p class="text-lg text-base-content">{{ eventData.description }}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div class="space-y-2">
            <p>
              <span class="font-bold text-secondary">地点:</span>
              {{ eventData.location }}
            </p>
            <p>
              <span class="font-bold text-secondary">开始时间:</span>
              {{ eventData.startDate }}
            </p>
            <p>
              <span class="font-bold text-secondary">结束时间:</span>
              {{ eventData.endDate }}
            </p>
          </div>
          <div class="space-y-2">
            <p>
              <span class="font-bold text-secondary">状态:</span>
              {{ eventData.status }}
            </p>
          </div>
        </div>
        <div class="card-actions justify-end mt-6">
          <button
            class="btn btn-primary"
            @click="showRegisterModal = true"
            v-show="!isreged"
          >
            报名
          </button>
          <button class="btn" disabled v-show="isreged">已报名</button>
        </div>
      </div>
    </div>

    <div
      v-if="showRegisterModal"
      class="modal modal-open"
      @click.self="showRegisterModal = false"
    >
      <div class="modal-box">
        <h3 class="font-bold text-lg text-primary">报名信息</h3>
        <div class="space-y-4 mt-4">
          <div class="form-control">
            <label class="label w-20">
              <span class="label-text">用户ID</span>
            </label>
            <input
              type="text"
              class="input input-bordered"
              :value="user?.userID || '未获取到用户ID'"
              disabled
            />
          </div>
          <div class="form-control">
            <label class="label w-20">
              <span class="label-text">赛事名</span>
            </label>
            <input
              type="text"
              class="input input-bordered"
              :value="eventData?.name"
              disabled
            />
          </div>
          <div class="form-control">
            <label class="label w-20">
              <span class="label-text">开始时间</span>
            </label>
            <input
              type="text"
              class="input input-bordered"
              :value="eventData?.startDate"
              disabled
            />
          </div>
          <div class="form-control">
            <label class="label w-20">
              <span class="label-text">结束时间</span>
            </label>
            <input
              type="text"
              class="input input-bordered"
              :value="eventData?.endDate"
              disabled
            />
          </div>
          <div class="form-control">
            <label class="label w-20">
              <span class="label-text">状态</span>
            </label>
            <input
              type="text"
              class="input input-bordered"
              :value="eventData?.status"
              disabled
            />
          </div>
          <div class="form-control">
            <label class="label w-20">
              <span class="label-text">报名时间</span>
            </label>
            <input
              type="text"
              class="input input-bordered"
              :value="registerForm.registrationDate"
              disabled
            />
          </div>
          <div class="modal-action">
            <button
              type="button"
              class="btn btn-ghost"
              @click="showRegisterModal = false"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="handleRegister"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "frontend",
});

let { id } = useRoute().params;
import * as Event from "~/api/Event";
let eventData: Ref<Event.EventItem | undefined> = ref();
let showRegisterModal = ref(false);
let isreged = ref(false);
let isloading = ref(true);
let registerForm = reactive({
  userID: 0,
  eventID: 0,
  registrationDate: formatDate(new Date()),
});
let { user } = useUserStore();
let { successToast, errorToast } = useToastStore();

onMounted(() => {
  initData();
  checkReged();
});

watch(
  () => user.value,
  () => {
    checkReged();
  }
);

async function checkReged() {
  isloading.value = true;
  let { data } = await Event.isRegisted(user.value.userID ?? -1, id + "");
  if (data.data?.status) {
    isreged.value = true;
  }
  isloading.value = false;
}
async function initData() {
  let { data } = await Event.list({ id: id + "" });
  eventData.value = data.data[0];
}

function getImgUrl(name: string) {
  return Event.getImgUrl(name);
}

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function handleRegister() {
  registerForm.userID = user.value.userID ?? -1;
  registerForm.eventID = eventData.value?.eventID || 0;
  let { data } = await Event.register(registerForm);
  if (data.code == 200) {
    successToast(data.message);
    isreged.value = true;
  } else {
    errorToast(data.message);
  }
  showRegisterModal.value = false;
}
</script>
