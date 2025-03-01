<template>
  <div>
    <div class="sticky top-0">
      <nav class="navbar justify-between bg-base-300">
        <div class="flex gap-2 overflow-x-auto">
          <a class="btn btn-ghost px-3 text-xl">
            <Icon name="solar:basketball-bold-duotone" size="1.5rem"></Icon>
            Basket-Club
          </a>
        </div>
        <div class="dropdown dropdown-end md:hidden">
          <button class="btn btn-ghost">
            <Icon name="solar:widget-3-bold-duotone" size="1rem"></Icon>
            菜单
          </button>

          <ul tabindex="0" class="dropdown-content menu z-[1] bg-base-200 p-6 rounded-box shadow w-56 gap-2">
            <li>
              <a>
                <Icon name="solar:home-2-bold-duotone" size="1.2rem"></Icon>
                首页
              </a>
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
            <div class="divider my-0"></div>
            <li>
              <a>
                <Icon name="solar:book-2-bold-duotone" size="1.2rem"></Icon>
                我的订单
              </a>
            </li>
            <li>
              <a>
                <Icon name="solar:shop-bold-duotone" size="1.2rem"></Icon>
                周边商品
              </a>
            </li>
            <div class="divider my-0"></div>
            <li>
              <a>
                <Icon name="solar:settings-bold-duotone" size="1.2rem"></Icon>
                设置
              </a>
            </li>
            <li>
              <NuxtLink to="/login">
                <Icon name="solar:login-3-bold-duotone" size="1.3rem"></Icon>
                登录
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Menu for desktop -->
        <div role="tablist" class="hidden md:tabs tabs-boxed">
          <a role="tab" class="tab gap-2">
            <Icon name="solar:home-2-bold-duotone" size="1.3rem"></Icon>
            首页
          </a>
          <a role="tab" class="tab tab-active gap-2">
            <Icon name="solar:clock-circle-bold-duotone" size="1.3rem"></Icon>
            预约场地
          </a>
          <a role="tab" class="tab gap-2">
            <Icon name="solar:basketball-bold-duotone" size="1.3rem"></Icon>
            比赛
          </a>
          <a role="tab" class="tab gap-2">
            <Icon name="solar:user-rounded-bold-duotone" size="1.3rem"></Icon>
            我的
          </a>
          <NuxtLink to="/login" role="tab" class="tab gap-2">
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
