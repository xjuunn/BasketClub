<template>
  <div class="w-full h-[calc(100vh-100px)] flex items-center justify-center">
    <div class="flex flex-col gap-4 rounded-box bg-base-200 p-6 max-w-md">
      <h1 class="text-3xl font-bold self-center">登 录</h1>

      <span class="self-center">
        还没有账号？
        <NuxtLink to="/register" class="link link-secondary">去注册</NuxtLink>
      </span>

      <div class="text-center">
        <label for="username" class="input">
          <span class="label w-30 justify-end">用户名</span>
          <input v-model="username" id="username" type="text">
        </label>
        <label for="password" class="input mt-3">
          <span class="label w-30 justify-end">密码</span>
          <input v-model="password" type="password" id="password">
        </label>
      </div>
      <div class="form-control ml-10">
        <label class="cursor-pointer label self-start gap-2">
          <input v-model="rember" type="checkbox" class="checkbox" />
          <span class="label-text">记住我</span>
        </label>
      </div>

      <button @click="login" class="btn btn-primary ms-10 me-10 mb-7">登 录</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'frontend'
})
let username = ref('');
let password = ref('');
let rember = ref(false);

onMounted(() => {
  username.value = localStorage.getItem('username') ?? '';
  password.value = localStorage.getItem('password') ?? '';
  rember.value = Boolean(localStorage.getItem('rember')) ?? false;
})

let { successToast, errorToast } = useToastStore();
async function login() {
  if (username.value.length === 0) {
    errorToast("请输入用户名");
    return;
  }
  if (username.value.length > 25) {
    errorToast("用户名过长");
    return;
  }
  if (password.value.length === 0) {
    errorToast("请输入密码");
    return;
  } if (password.value.length > 30) {
    errorToast("密码过长");
    return;
  }
  let data = await useUserStore().login(username.value, password.value);
  if (data.code == 200) {
    localStorage.setItem('username', username.value);
    localStorage.setItem('password', password.value);
    localStorage.setItem('rember', rember.value + '');
    navigateTo('/')
    successToast('登录成功');
  }
}
</script>