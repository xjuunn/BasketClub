<template>
  <div class="w-full h-[calc(100vh-100px)] flex items-center justify-center">
    <div class="flex flex-col gap-4 rounded-box bg-base-200 p-6 max-w-md">
      <h1 class="text-3xl font-bold self-center">注 册</h1>

      <span class="self-center">
        突然想起来有账号？
        <NuxtLink to="/login" class="link link-secondary">去登录</NuxtLink>
      </span>

      <div class="text-center">
        <div class="text-left ps-10 mb-4 flex">
          <button class="btn btn-accent btn-soft" @click="selectFile">
            <Icon name="solar:cloud-upload-bold-duotone" size="1.3rem"></Icon>
            上传图片
            <input type="file" ref="fileSelector" @change="onSelectFile" hidden>
          </button>
          <div class="flex items-center ml-3">
            {{ filename }}
          </div>
        </div>
        <label for="username" class="input">
          <span class="label w-30 justify-end">用户名</span>
          <input v-model="username" id="username" type="text">
        </label>
        <label for="password" class="input mt-3">
          <span class="label w-30 justify-end">密码</span>
          <input v-model="password" type="password" id="password">
        </label>
        <label for="password2" class="input mt-3">
          <span class="label w-30 justify-end">确认密码</span>
          <input v-model="password2" type="password" id="password2">
        </label>
      </div>
      <button @click="register" class="btn btn-primary ms-10 me-10 mb-7">注 册</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'frontend'
})
import * as Auth from '../api/Auth'
let fileSelector: Ref<HTMLElement | null> = ref(null);
let username = ref('');
let password = ref('');
let password2 = ref('');
let filename = ref('');
let avatarFile: File | null = null;
async function selectFile() {
  fileSelector.value?.click();
}
let { errorToast, successToast } = useToastStore();
function onSelectFile(e: Event) {
  let target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    let file = target.files[0];
    if (file.size > 1024 * 1024 * 20) {
      errorToast("文件太大了");
      return;
    }

    filename.value = file.name;
    avatarFile = file;
  }

}
async function register() {
  if (username.value.length === 0) {
    errorToast("请输入用户名");
    return;
  }
  if (username.value.length > 15) {
    errorToast("用户名太长了");
    return;
  }
  if (password.value === '') {
    errorToast("请输入密码");
    return;
  }
  if (password.value !== password2.value) {
    errorToast("两次输入的密码不一致");
    return;
  }
  if (!avatarFile) {
    errorToast("请选择用户头像");
    return;
  }
  let { data } = await Auth.register(username.value, password.value, avatarFile)
  if (data.code === 200) {
    successToast('注册成功');
    navigateTo("/login");
  }

}
</script>