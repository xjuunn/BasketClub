<template>
  <div>
    <div class="sticky top-0 z-50">
      <nav class="navbar justify-between bg-base-300">
        <div class="flex gap-2 overflow-x-auto">
          <NuxtLink to="/" class="btn btn-ghost px-3 text-xl">
            <Icon name="solar:basketball-bold-duotone" size="1.5rem"></Icon>
            Basket-Club
          </NuxtLink>
        </div>
        <div class="dropdown dropdown-end md:hidden z-[50]">
          <button class="btn btn-ghost">
            <Icon name="solar:widget-3-bold-duotone" size="1rem"></Icon>
            菜单
          </button>
          <!-- 小屏菜单 -->
          <ul tabindex="0" class="dropdown-content menu z-[50] bg-base-200 p-6 rounded-box shadow w-56 gap-2">
            <li>
              <NuxtLink to="/">
                <Icon name="solar:home-2-bold-duotone" size="1.2rem"></Icon>
                首页
              </NuxtLink>
            </li>
            <li>
              <a class="active">
                <Icon name="solar:clock-circle-bold-duotone" size="1.2rem"></Icon>
                预约场地
              </a>
            </li>
            <li>
              <a>
                <Icon name="solar:basketball-bold-duotone" size="1.2rem"></Icon>
                比赛
              </a>
            </li>
            <div class="divider my-0" v-show="islogin"></div>
            <li v-show="islogin">
              <a>
                <Icon name="solar:book-2-bold-duotone" size="1.2rem"></Icon>
                我的订单
              </a>
            </li>
            <li v-show="islogin">
              <a>
                <Icon name="solar:shop-bold-duotone" size="1.2rem"></Icon>
                周边商品
              </a>
            </li>
            <div class="divider my-0"></div>
            <li v-show="user.role == 2">
              <NuxtLink to="/admin">
                <Icon name="solar:shield-keyhole-minimalistic-bold-duotone" size="1.2rem"></Icon>
                管理后台
              </NuxtLink>
            </li>
            <li v-show="islogin">
              <NuxtLink to="/personal">
                <Icon name="solar:user-rounded-bold-duotone" size="1.2rem"></Icon>
                我的
              </NuxtLink>
            </li>
            <li v-show="!islogin">
              <NuxtLink to="/login">
                <Icon name="solar:login-3-bold-duotone" size="1.2rem"></Icon>
                登录
              </NuxtLink>
            </li>
            <li v-show="islogin">
              <NuxtLink to="/login" @click="logout">
                <Icon name="solar:login-3-bold-duotone" size="1.2rem"></Icon>
                登出
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 大屏菜单 -->
        <div role="tablist" class="hidden md:tabs tabs-boxed">
          <NuxtLink to="/" role="tab" class="tab gap-2" :class="{ 'tab-active': route.path === '/' }">
            <Icon name="solar:home-2-bold-duotone" size="1.3rem"></Icon>
            首页
          </NuxtLink>
          <a role="tab" class="tab  gap-2">
            <Icon name="solar:clock-circle-bold-duotone" size="1.3rem"></Icon>
            预约场地
          </a>
          <a role="tab" class="tab gap-2">
            <Icon name="solar:basketball-bold-duotone" size="1.3rem"></Icon>
            比赛
          </a>
          <NuxtLink to="/admin" role="tab" class="tab gap-2" v-show="user.role == 2">
            <Icon name="solar:shield-keyhole-minimalistic-bold-duotone" size="1.2rem"></Icon>
            管理后台
          </NuxtLink>
          <NuxtLink to="/personal" v-show="islogin" role="tab" class="tab gap-2"
            :class="{ 'tab-active': route.path === '/personal' }">
            <Icon name="solar:user-rounded-bold-duotone" size="1.3rem"></Icon>
            我的
          </NuxtLink>
          <NuxtLink v-show="!islogin" to="/login" role="tab" class="tab gap-2"
            :class="{ 'tab-active': route.path === '/login' }">
            <Icon name="solar:login-3-bold-duotone" size="1.3rem"></Icon>
            登录
          </NuxtLink>
        </div>
      </nav>

      <!-- <nav class="navbar justify-end bg-base-200">
        <ul class="menu menu-horizontal justify-center flex-nowrap overflow-x-auto">
          <li><a>Table</a></li>
          <li><a class="active">Graph</a></li>
          <li><a>Nodes</a></li>
          <li><a>Links</a></li>
          <li><a>List</a></li>
        </ul>
      </nav> -->
    </div>
    <slot />
  </div>
</template>
<script lang="ts" setup>
let { islogin, logout, user } = useUserStore();
let route = useRoute();

</script>
