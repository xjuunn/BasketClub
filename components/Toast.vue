<template>
  <div class="toast toast-center toast-top z-40">
    <div v-for="(item, index) in toastList" class="alert" :class="`alert-${item.type} alert-${item.style}`" >
      <Icon :name="item.icon??'mdi:success'" size="1.3rem"></Icon>
      {{ item.message }}
    </div>
  </div>
  <div>

  </div>
</template>

<script lang="ts" setup>
let { toastList } = useToastStore();
</script>
