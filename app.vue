<template>
  <div class="w-full overflow-hidden">
    <div class="h-0 overflow-hidden">
      <div class="alert alert-error"></div>
      <div class="alert alert-info"></div>
      <div class="alert alert-success"></div>
      <div class="alert alert-warning"></div>
    </div>
    <title>BasketClub</title>
    <Toast></Toast>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
<script lang="ts" setup>
useHead({
  link:[
    {rel:'icon',type:'image/png',href:'/icon64.png'}
  ]
})
</script>
<style lang="css" scoped>
html , body {
  width: 100vw;
  overflow: hidden;
}
</style>