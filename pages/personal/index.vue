<template>
  <div class="flex flex-col items-center p-6 max-w-lg mx-auto z-10">
    <div class="card bg-base-200 w-full min-h-[200px] p-6">
      <div class="text-center">
        <h3 class="text-xl font-semibold flex items-center gap-2">
          <Icon name="mdi:account-circle" class="text-primary" />
          <!-- {{ user.role === 1 ? '普通用户' : '管理员' }} -->
          {{ ["普通用户", "会员", "管理员"][user.role ?? 0] }}
        </h3>
        <p
          class="text-gray-500 flex items-center gap-2"
          v-show="user.role == 1"
        >
          <Icon name="mdi:crown" class="text-yellow-500" />
          会员等级: {{ user.membershipLevel }}
        </p>
      </div>

      <div class="grid grid-cols-3 gap-4 w-full text-sm">
        <div class="p-4 bg-base-200 rounded-lg text-center">
          <p class="text-gray-500 flex items-center justify-center gap-2">
            <Icon name="mdi:wallet" class="text-green-500" /> 余额
          </p>
          <p class="text-lg font-bold">${{ user.balance }}</p>
        </div>
        <div
          class="p-4 bg-base-200 rounded-lg text-center"
          v-show="user.role == 1"
        >
          <p class="text-gray-500 flex items-center justify-center gap-2">
            <Icon name="mdi:star" class="text-yellow-500" /> 积分
          </p>
          <p class="text-lg font-bold">{{ user.points }}</p>
        </div>
        <div class="p-4 bg-base-200 rounded-lg text-center">
          <p class="text-gray-500 flex items-center justify-center gap-2">
            <Icon name="mdi:gender-male-female" class="text-blue-500" /> 性别
          </p>
          <p class="text-lg font-bold">
            {{ user.gender === 1 ? "男" : user.gender === 2 ? "女" : "其他" }}
          </p>
        </div>
      </div>
      <div class="divider mt-4 mb-10">修改</div>
      <!-- 头像上传 -->
      <div class="flex flex-col items-center mb-4">
        <div class="avatar">
          <div
            class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
          >
            <img v-if="imgurl !== ''" :src="imgurl" alt="头像" />
          </div>
        </div>
        <button class="btn btn-sm btn-primary mt-2" @click="btnInputFile">
          更改头像
        </button>
        <input type="file" ref="fileInput" hidden @change="onFileSelect" />
      </div>
      <div class="mt-4 mb-4"></div>
      <!-- 用户名输入框 -->
      <label class="form-control w-full mb-4">
        <div class="label">
          <span class="label-text">用户名</span>
        </div>
        <input
          v-model="username"
          disabled
          type="text"
          placeholder="请输入用户名"
          class="input input-bordered w-full"
        />
      </label>

      <!-- 性别选择 -->
      <div class="form-control w-full mb-4">
        <div class="label">
          <span class="label-text">性别</span>
        </div>
        <div class="flex gap-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="1"
              v-model="sex"
              name="gender"
              class="radio checked:bg-primary"
            />
            <span>男</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="2"
              v-model="sex"
              name="gender"
              class="radio checked:bg-primary"
            />
            <span>女</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="0"
              v-model="sex"
              name="gender"
              class="radio checked:bg-primary"
            />
            <span>其他</span>
          </label>
        </div>
      </div>
      <div class="flex flex-wrap gap-4 mb-8">
        <div class="">
          <button
            class="btn btn-primary"
            v-show="user.role == 0"
            @click="showUpgradeModal = true"
          >
            升级为会员
          </button>
          <button
            class="btn btn-secondary"
            @click="showExchangeModal = true"
            v-show="user.role == 1"
          >
            兑换积分
          </button>
          <button
            class="btn btn-secondary ml-2"
            v-show="user.role == 1 || user.role == 0"
            @click="chong"
          >
            充值
          </button>
        </div>
      </div>
      <!-- 提交按钮 -->
      <button class="btn btn-primary w-full" @click="sendUpdate">
        保存修改
      </button>
      <button
        class="btn btn-error mt-3 w-full"
        @click="
          logout();
          navigateTo('/login');
        "
      >
        退出登录
      </button>
    </div>
    <br />
    <!-- 升级为会员 Modal -->
    <div
      v-if="showUpgradeModal"
      class="modal modal-open"
      @click.self="showUpgradeModal = false"
    >
      <div class="modal-box">
        <h3 class="font-bold text-lg">升级为会员</h3>
        <p class="py-4">确定要升级为会员吗？</p>
        <div class="modal-action">
          <button class="btn btn-ghost" @click="showUpgradeModal = false">
            取消
          </button>
          <button class="btn btn-primary" @click="handleUpgrade">确定</button>
        </div>
      </div>
    </div>

    <!-- 兑换积分 Modal -->
    <div
      v-if="showExchangeModal"
      class="modal modal-open"
      @click.self="showExchangeModal = false"
    >
      <div class="modal-box">
        <h3 class="font-bold text-lg">兑换积分</h3>
        <div class="grid grid-cols-1 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text w-20">兑换类型</span>
            </label>
            <select class="select select-bordered" v-model="exchangeType">
              <option value="100">100 积分</option>
              <option value="500">500 积分</option>
              <option value="1000">1000 积分</option>
            </select>
          </div>
        </div>
        <div class="modal-action">
          <button class="btn btn-ghost" @click="showExchangeModal = false">
            取消
          </button>
          <button class="btn btn-primary" @click="handleExchange">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "frontend",
});
import * as Auth from "../../api/Auth";
import * as Point from "~/api/Point";
let { user, userid, refreshUserInfo, logout } = useUserStore();
onMounted(() => {
  imgurl.value = Auth.getAvatar(user.value.avatar ?? "");
  sex.value = user.value.gender ?? -1;
  username.value = user.value.username ?? "";
});
watch(
  () => user.value.avatar,
  () => {
    imgurl.value = Auth.getAvatar(user.value.avatar ?? "");
    sex.value = user.value.gender ?? -1;
    username.value = user.value.username ?? "";
  }
);
let fileInput: Ref<HTMLElement | null> = ref(null);
let imgurl: Ref<string> = ref("");
let username = ref("");
let avatarFile: File | null = null;
let sex: Ref<number> = ref(-1);
function btnInputFile() {
  fileInput.value?.click();
}
function onFileSelect(e: Event) {
  let target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    let file = target.files[0];
    avatarFile = file;
    imgurl.value = URL.createObjectURL(file);
  }
}
const showUpgradeModal = ref(false);
const showExchangeModal = ref(false);
const exchangeType = ref<100 | 500 | 1000 | "100" | "500" | "1000">(100);
let { errorToast, successToast } = useToastStore();
async function sendUpdate() {
  let userinfo: Auth.FormUpdate = { username: username.value };
  if (sex.value !== -1) userinfo.gender = sex.value;
  if (avatarFile) userinfo.avatar = avatarFile;
  let { data } = await Auth.update(userinfo);
  if (data.code !== 200) {
    errorToast(data.message);
  } else {
    successToast(data.message);
  }
  refreshUserInfo();
}
async function handleUpgrade() {
  try {
    let { data } = await Point.UpgradetoMember(user.value.username ?? "-1");
    successToast(data.message);
    showUpgradeModal.value = false;
    logout();
    navigateTo("/login");
    refreshUserInfo();
  } catch (error) {
    errorToast("升级为会员失败");
  }
}

async function handleExchange() {
  try {
    let { data } = await Point.exchange(
      user.value.userID ?? "-1",
      exchangeType.value
    );
    if (data.code == 200) {
      successToast(data.message);
    } else {
      errorToast(data.message);
    }
    showExchangeModal.value = false;
    refreshUserInfo();
  } catch (error) {
    errorToast("兑换积分失败");
  }
}

async function chong() {
  let { data } = await Auth.updateBalance({
    balance: (user.value.balance ?? 0) + 1000,
    username: username.value,
  });
  if (data.code == 200) {
    successToast(data.message);
  } else {
    errorToast(data.message);
  }

  refreshUserInfo();
}
</script>
