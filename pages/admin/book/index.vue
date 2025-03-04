<template>
  <div class="p-4">
    <!-- 搜索表单 -->
    <div class="card bg-base-100 shadow-sm p-4 mb-6">
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <div class="form-control">
          <label class="label">
            <span class="label-text">场地名称</span>
          </label>
          <input
            v-model="searchForm.name"
            type="text"
            placeholder="请输入场地名称"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">位置</span>
          </label>
          <input
            v-model="searchForm.location"
            type="text"
            placeholder="请输入位置"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">容量</span>
          </label>
          <input
            v-model="searchForm.capacity"
            type="text"
            placeholder="请输入容量"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">价格</span>
          </label>
          <input
            v-model="searchForm.pricePerHour"
            type="number"
            placeholder="请输入价格"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">状态</span>
          </label>
          <select
            v-model="searchForm.status"
            class="select select-bordered w-full"
          >
            <option value="">全部</option>
            <option value="available">可用</option>
            <option value="unavailable">不可用</option>
          </select>
        </div>
        <div class="form-control self-end">
          <div class="join">
            <button
              @click="handleSearch"
              class="btn btn-primary join-item btn-sm"
            >
              搜索
            </button>
            <button @click="handleReset" class="btn btn-ghost join-item btn-sm">
              重置
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="card bg-base-100 shadow-sm p-4">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th>场地名称</th>
              <th>图片</th>
              <th>位置</th>
              <th>容量</th>
              <th>价格</th>
              <th>状态</th>
              <th>描述</th>
              <th>创建时间</th>
              <th>更新时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in venueList" :key="item.venueID">
              <td>{{ item.name }}</td>
              <td>
                <img
                  :src="Venue.getImgUrl(item.imageUrl)"
                  alt="场地图片"
                  class="w-16 h-16 object-cover rounded"
                />
              </td>
              <td>{{ item.location }}</td>
              <td>{{ item.capacity }}</td>
              <td>{{ item.pricePerHour }}</td>
              <td>
                <span
                  :class="{
                    'badge badge-success': item.status === 'available',
                    'badge badge-error': item.status === 'unavailable',
                  }"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="max-w-[200px] truncate" :title="item.description">
                {{ item.description }}
              </td>
             
              <td>{{ item.createdAt }}</td>
              <td>{{ item.updatedAt }}</td>
              <td>
                <div class="join">
                  <button
                    @click="openEditModal(item)"
                    class="btn btn-sm btn-info join-item"
                  >
                    编辑
                  </button>
                  <button
                    @click="openDeleteModal(item.venueID)"
                    class="btn btn-sm btn-error join-item"
                  >
                    删除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 分页按钮 -->
    <div class="join mt-4">
      <button
        @click="handlePrevPage"
        :disabled="currentPage === 1"
        class="btn join-item"
      >
        上一页
      </button>
      <button
        @click="handleNextPage"
        :disabled="venueList.length < pageSize"
        class="btn join-item"
      >
        下一页
      </button>
    </div>

    <!-- 编辑 Modal -->
    <dialog id="editModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">编辑场地</h3>
        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">场地名称</span>
          </label>
          <input
            v-model="editForm.name"
            type="text"
            placeholder="请输入场地名称"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">位置</span>
          </label>
          <input
            v-model="editForm.location"
            type="text"
            placeholder="请输入位置"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">容量</span>
          </label>
          <input
            v-model="editForm.capacity"
            type="text"
            placeholder="请输入容量"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">价格</span>
          </label>
          <input
            v-model="editForm.pricePerHour"
            type="number"
            placeholder="请输入价格"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">状态</span>
          </label>
          <select
            v-model="editForm.status"
            class="select select-bordered w-full"
          >
            <option value="available">可用</option>
            <option value="unavailable">不可用</option>
          </select>
        </div>
        <div class="form-control mt-4">
          <label class="label">
            <span class="label-text">描述</span>
          </label>
          <textarea
            v-model="editForm.description"
            placeholder="请输入描述"
            class="textarea textarea-bordered w-full"
          ></textarea>
        </div>
        <div class="modal-action mt-6">
          <button @click="handleEdit" class="btn btn-primary">保存</button>
          <button @click="closeEditModal" class="btn btn-ghost">取消</button>
        </div>
      </div>
    </dialog>

    <!-- 删除 Modal -->
    <dialog id="deleteModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">确认删除</h3>
        <p class="py-4">确定要删除该场地吗？</p>
        <div class="modal-action">
          <button @click="handleDelete" class="btn btn-error">删除</button>
          <button @click="closeDeleteModal" class="btn btn-ghost">取消</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import * as Venue from "~/api/Venue";
import { ref } from "vue";
definePageMeta({
  layout: "admin",
});
interface SearchListFormWithPagination extends Venue.SearchListForm {
  page: number;
  size: number;
}

const searchForm = ref<SearchListFormWithPagination>({
  page: 1,
  size: 15,
});
const venueList = ref<Venue.VenueItem[]>([]);
const currentPage = ref(1);
const pageSize = ref(15);
const editForm = ref<Venue.createForm>({
  name: "",
  location: "",
  capacity: 0,
  pricePerHour: 0,
  description: "",
  image: new File([], ""),
  status: "available",
});
const deleteId = ref<number | string>("");

const fetchVenueList = async () => {
  const res = await Venue.list(searchForm.value);
  venueList.value = res.data.data;
};

const handleSearch = () => {
  currentPage.value = 1;
  fetchVenueList();
};

const handleReset = () => {
  searchForm.value = { page: 1, size: 15 };
  fetchVenueList();
};

const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    searchForm.value.page = currentPage.value;
    fetchVenueList();
  }
};

const handleNextPage = () => {
  if (venueList.value.length === pageSize.value) {
    currentPage.value++;
    searchForm.value.page = currentPage.value;
    fetchVenueList();
  }
};

const openEditModal = (item: Venue.VenueItem) => {
  editForm.value = {
    name: item.name,
    location: item.location,
    capacity: item.capacity,
    pricePerHour: item.pricePerHour,
    description: item.description,
    image: new File([], ""),
    status: item.status as "available" | "unavailable",
  };
  (document.getElementById("editModal") as HTMLDialogElement).showModal();
};

const closeEditModal = () => {
  (document.getElementById("editModal") as HTMLDialogElement).close();
};

const handleEdit = async () => {
  const venueID = venueList.value.find(
    (item) => item.name === editForm.value.name
  )?.venueID;
  if (venueID) {
    await Venue.update(venueID, editForm.value);
    closeEditModal();
    fetchVenueList();
  }
};

const openDeleteModal = (id: number | string) => {
  deleteId.value = id;
  (document.getElementById("deleteModal") as HTMLDialogElement).showModal();
};

const closeDeleteModal = () => {
  (document.getElementById("deleteModal") as HTMLDialogElement).close();
};

const handleDelete = async () => {
  await Venue.del(deleteId.value);
  closeDeleteModal();
  fetchVenueList();
};

fetchVenueList();
</script>
