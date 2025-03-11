export default defineEventHandler(async (event) => {

  return (await useStorage().getItem('usernum')) ?? 0
})
