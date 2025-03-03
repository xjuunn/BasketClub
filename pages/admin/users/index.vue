<template>
  <div class="overflow-scroll h-full">
    <div class="p-3">
      <div class="input floating-label input-md">
        <span>用户名</span>
        <input
          v-model="searchValur.username"
          type="text"
          placeholder="用户名"
        />
      </div>
      <div class="join ml-3 mr-3">
        <button class="btn btn-sm join-item btn-primary" @click="initList">
          搜索
        </button>
        <button
          class="btn btn-sm join-item btn-primary btn-soft"
          @click="
            searchValur.username = '';
            initList();
            searchValur.page = 1;
          "
        >
          重置
        </button>
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <td>ID</td>
          <td>头像</td>
          <td>用户名</td>
          <td>性别</td>
          <td>余额</td>
          <td>角色</td>
          <td>会员等级</td>
          <td>积分</td>
          <td>创建时间</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in listdata" :key="item.userID">
          <td>
            {{ item.userID }}
          </td>
          <td>
            <div class="avatar overflow-hidden rounded-full w-10 h-10">
              <img :src="User.getAvatar(item.avatar ?? '')" />
            </div>
          </td>
          <td>
            {{ item.username }}
          </td>
          <td>
            {{ ["未知", "男", "女"][Number(item.gender)] }}
          </td>
          <td>
            {{ item.balance }}
          </td>
          <td>
            {{ ["普通用户", "会员", "管理员"][Number(item.role)] }}
          </td>
          <td>
            {{ item.membershipLevel }}
          </td>
          <td>
            {{ item.points }}
          </td>
          <td>
            {{ new Date(item.createdAt ?? "").toLocaleString() }}
          </td>
          <td>
            <div class="w-16">
              <button
                class="btn btn-error btn-sm"
                @click="
                  showUpdateModal = true;
                  btnDel(item.userID ?? -1);
                "
              >
                删除
              </button>
            </div>
            <!-- <div class="join"> -->
            <!-- <button class="btn btn-primary btn-sm join-item" @click="btnUpdate(item)">修改</button> -->
            <!-- </div> -->
          </td>
        </tr>
      </tbody>
    </table>
    <ModalVue
      title="修改用户"
      :show="showUpdateModal"
      @update:show="(e) => (showUpdateModal = e)"
    >
      <template #body> 是否要删除ID为 {{ delId }} 的用户 </template>
      <template #bottom>
        <div class="join">
          <button
            class="btn btn-sm btn-ghost join-item"
            @click="showUpdateModal = false"
          >
            取消
          </button>
          <button
            class="btn btn-sm btn-error join-item"
            @click="
              showUpdateModal = false;
              doDel();
            "
          >
            删除
          </button>
        </div>
      </template>
    </ModalVue>
    <div class="text-center w-full mt-3 mb-10">
      <div class="join" v-show="!isloading">
        <button
          class="btn"
          @click="
            () => {
              if (!searchValur.page) searchValur.page = 1;
              if (searchValur.page == 1) return;
              searchValur.page == 1
                ? (searchValur.page = 1)
                : searchValur.page--;
              initList();
            }
          "
        >
          上一页
        </button>
        <button class="btn">{{ searchValur.page }}</button>
        <button
          :disabled="listdata.length < (searchValur.size ?? 15)"
          class="btn"
          @click="
            () => {
              if (!searchValur.page) searchValur.page = 1;
              searchValur.page++;
              initList();
            }
          "
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "admin",
});
import * as User from "../../../api/Auth";
let listdata: Ref<User.Datum[]> = ref([]);
let isloading = ref(true);
let searchValur: Ref<User.FormList> = ref({
  page: 1,
  size: 15,
  username: "",
});
let showUpdateModal = ref(false);
let updateItem: Ref<User.Datum> = ref({});
let delId = ref(-1);
onMounted(() => {
  initList();
});
async function initList() {
  isloading.value = true;
  let { data } = await User.list(searchValur.value);
  listdata.value = data.data;
  isloading.value = false;
}
function btnUpdate(item: User.Datum) {
  updateItem.value = Object.assign({}, item);
  showUpdateModal.value = true;
}
function btnDel(id: number) {
  delId.value = id;
}
let { successToast, errorToast } = useToastStore();
async function doDel() {
  let { data } = await User.del(delId.value);
  if (data.code == 200) {
    successToast(data.message);
    initList();
  } else {
    errorToast(data.message);
  }
}
// async function doUpdate() {
//   let { data } = await User.update({
//     username:updateItem.value.username??'',

//   });
// }
</script>
