<template>
  <div class="flex w-screen">
    <aside class="h-screen sticky top-0 flex flex-col bg-base-200 overflow-y-auto min-w-[250px]">
      <!-- Header -->
      <div class="flex justify-between p-2">
        <!-- Logo -->
        <NuxtLink to="/" class="btn btn-ghost text-lg">
          <!-- <img alt="Logo" src="/logo.svg" class="w-4" /> -->
          <Icon name="solar:basketball-bold-duotone" size="2rem"></Icon>
          BasketClub
        </NuxtLink>

        <a class="btn btn-ghost btn-circle text-lg" title="系统设置">
          <Icon name="solar:settings-bold-duotone" size="1.5rem" />
        </a>
      </div>

      <!-- Body -->
      <div class="flex flex-col border-y border-base-300 px-6 pt-4 grow">
        <!-- Links -->
        <div class="flex flex-col divide-y divide-base-300">
          <ul class="menu px-0 py-4">
            <li>
              <NuxtLink to="/">
                <Icon name="solar:home-2-bold-duotone" size="1.3rem"></Icon>
                用户前台
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admin">
                <Icon name="solar:pie-chart-2-bold-duotone" size="1.3rem"></Icon>
                仪表盘
              </NuxtLink>
            </li>
            <li class="menu-title">用户</li>
            <li>
              <NuxtLink to="/admin/users">
                <Icon name="solar:user-bold-duotone" size="1.3rem"></Icon>
                用户管理
              </NuxtLink>
            </li>
            <li>
              <a>
                <Icon name="solar:wallet-money-bold-duotone" size="1.3rem"></Icon>
                订单和财务
              </a>
            </li>
            <li class="menu-title">场地</li>
            <li>
              <NuxtLink to="/admin/venue" class="active">
                <Icon name="solar:folder-with-files-bold-duotone" size="1.3rem"></Icon>
                场地管理
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admin/book">
                <Icon name="solar:clock-square-bold-duotone" size="1.3rem"></Icon>
                预约管理
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admin/event">
                <Icon name="solar:plate-bold-duotone" size="1.3rem"></Icon>
                赛事管理
              </NuxtLink>
            </li>
            <li class="menu-title">反馈</li>
            <li>
              <a>
                <Icon name="solar:mailbox-bold-duotone" size="1.3rem"></Icon>
                投诉和问题
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-between items-center p-2">
        <a class="btn">
          <img v-show="user.avatar" alt="头像" :src="Auth.getAvatar(user.avatar ?? '')" class="w-8 rounded-full" />

          <div class="flex flex-col text-start">
            <span class="font-bold">{{ user.username }}</span>
            <!-- <span class="text-sm text-accent">{{ user. }}</span> -->
          </div>
        </a>

        <NuxtLink to="/login" @click="logout" class="btn btn-error btn-sm mr-3" title="登出">
          <Icon name="solar:exit-bold-duotone" size="1.3rem" />
        </NuxtLink>
      </div>
    </aside>
    <div class="flex-1 w-[calc(100vw-250px)]">
      <div class="navbar bg-base-200 flex items-center">
        <div class="navbar-start">

        </div>
        <div class="navbar-end">
          <div class="menu menu-sm">
            <button class="btn btn-xs btn-goast menu-item">
              <Icon name="solar:notification-unread-bold-duotone" size="1.2rem"></Icon>
              通知
            </button>
          </div>
        </div>
      </div>
      <div class="w-full overflow-scroll h-[calc(100vh-67px)]">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
let { user, logout } = useUserStore();
import { NuxtLink } from '#components';
import * as Auth from '../api/Auth'
</script>
