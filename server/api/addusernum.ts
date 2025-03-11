export default defineEventHandler(async (event) => {
  let usernum = await useStorage().getItem('usernum');
  if (!usernum) await useStorage().setItem('usernum', 0);
  await useStorage().setItem('usernum', Number(usernum) + 1)
  return Number(usernum) + 1
})
