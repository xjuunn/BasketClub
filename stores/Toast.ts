import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', () => {

  let _toastList: Ref<ToastItem[]> = ref([]);
  let toastList = computed(() => _toastList);
  function addToast(toast: ToastItem) {
    if (!toast.type) toast.type = 'success';
    if (!toast.style) toast.style = 'soft';
    if (!toast.icon) {
      toast.icon = toast.type === 'success' ? 'mdi:success' : 'mdi:error'
    }
    _toastList.value.push(toast);
    setTimeout(() => {
      _toastList.value.shift();
    }, 3000);
  }
  function errorToast(message: string) {
    addToast({ message, type: 'error' })
  }
  function successToast(message: string) {
    addToast({ message, type: 'success' })
  }
  return {
    toastList,
    addToast,
    errorToast,
    successToast
  }
})
type ToastItem = {
  icon?: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  style?: 'outline' | 'dash' | 'soft' | 'default';
}