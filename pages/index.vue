<template>
  <div>
    <button class="btn btn-primary" @click="test">test</button>

  </div>
</template>
<script lang="ts" setup>
definePageMeta({
  layout: 'frontend'
})
let { addToast,errorToast,successToast } = useToastStore();
let i = 1;
async function test() {
  // addToast({ message: 'test' + i++,style:'soft'})
  // errorToast('错误')
  successToast('成功')
}

</script>