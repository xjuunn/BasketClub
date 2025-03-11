export default defineEventHandler(async (event) => {
  let time = await useStorage().getItem('starttime');
  if (!time || time == null) {
    time = Date.now();
    await useStorage().setItem('starttime', Date.now() + '');
    return time;
  }

  return time;
})
