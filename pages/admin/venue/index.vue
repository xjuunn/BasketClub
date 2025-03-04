<template>
  <div class="p-4">
    <!-- 搜索表单 -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
      <input
        v-model="searchForm.name"
        type="text"
        placeholder="场地名称"
        class="input input-bordered w-full md:w-auto"
      />
      <input
        v-model="searchForm.location"
        type="text"
        placeholder="场地位置"
        class="input input-bordered w-full md:w-auto"
      />
      <input
        v-model="searchForm.capacity"
        type="number"
        placeholder="容纳人数"
        class="input input-bordered w-full md:w-auto"
      />
      <input
        v-model="searchForm.minPrice"
        type="number"
        placeholder="最低价格"
        class="input input-bordered w-full md:w-auto"
      />
      <input
        v-model="searchForm.maxPrice"
        type="number"
        placeholder="最高价格"
        class="input input-bordered w-full md:w-auto"
      />
      <select
        v-model="searchForm.status"
        class="select select-bordered w-full md:w-auto"
      >
        <option value="">全部状态</option>
        <option value="available">可用</option>
        <option value="unavailable">不可用</option>
      </select>
      <div class="join">
        <button @click="handleSearch" class="btn btn-primary join-item">
          搜索
        </button>
        <button @click="handleReset" class="btn btn-secondary join-item">
          重置
        </button>
        <button @click="openAddModal" class="btn btn-success join-item">
          添加场地
        </button>
      </div>
    </div>

    <!-- 数据列表 -->
    <div class="overflow-x-auto">
      <table class="table w-full h-fit">
        <thead>
          <tr>
            <th>名称</th>
            <th>位置</th>
            <th>容纳人数</th>
            <th>价格/小时</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="venue in venueList" :key="venue.venueID">
            <td class="max-w-[150px] truncate" :title="venue.name">
              {{ venue.name }}
            </td>
            <td class="max-w-[150px] truncate" :title="venue.location">
              {{ venue.location }}
            </td>
            <td>{{ venue.capacity }}</td>
            <td>{{ venue.pricePerHour }}</td>
            <td>
              <span
                :class="{
                  'badge badge-success': venue.status === 'available',
                  'badge badge-error': venue.status === 'unavailable',
                }"
              >
                {{ venue.status === "available" ? "可用" : "不可用" }}
              </span>
            </td>
            <td>
              <div class="join">
                <button
                  @click="openDetailModal(venue)"
                  class="btn btn-sm btn-info join-item"
                >
                  详情
                </button>
                <button
                  @click="openEditModal(venue)"
                  class="btn btn-sm btn-warning join-item"
                >
                  修改
                </button>
                <button
                  @click="openDeleteModal(venue.venueID)"
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

    <!-- 分页按钮 -->
    <div class="flex justify-center mt-4">
      <div class="join">
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
    </div>

    <!-- 场地详情 Modal -->
    <dialog id="detailModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">场地详情</h3>
        <div class="max-w-[70%]">
          <div class="py-4 space-y-4">
            <div class="flex items-start">
              <span class="font-semibold w-24 flex-shrink-0">名称:</span>
              <span class="break-words whitespace-pre-wrap w-full">{{
                selectedVenue?.name
              }}</span>
            </div>
            <div class="flex items-start">
              <span class="font-semibold w-24 flex-shrink-0">位置:</span>
              <div class="break-words whitespace-pre-wrap w-full">
                {{ selectedVenue?.location }}
              </div>
            </div>
            <div class="flex items-center">
              <span class="font-semibold w-24 flex-shrink-0">容纳人数:</span>
              <span class="break-words whitespace-pre-wrap">{{
                selectedVenue?.capacity
              }}</span>
            </div>
            <div class="flex items-center">
              <span class="font-semibold w-24 flex-shrink-0">价格/小时:</span>
              <span class="break-words whitespace-pre-wrap">{{
                selectedVenue?.pricePerHour
              }}</span>
            </div>
            <div class="flex items-center">
              <span class="font-semibold w-24 flex-shrink-0">状态:</span>
              <span
                :class="{
                  'badge badge-success': selectedVenue?.status === 'available',
                  'badge badge-error': selectedVenue?.status === 'unavailable',
                }"
              >
                {{ selectedVenue?.status === "available" ? "可用" : "不可用" }}
              </span>
            </div>
            <div class="flex items-start">
              <span class="font-semibold w-24 flex-shrink-0">描述:</span>
              <span class="break-words whitespace-pre-wrap w-full">{{
                selectedVenue?.description
              }}</span>
            </div>
            <div class="flex items-start">
              <span class="font-semibold w-24 flex-shrink-0">图片:</span>
              <img
                :src="Venue.getImgUrl(selectedVenue?.imageUrl ?? '')"
                alt="场地图片"
                class="w-32 h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
        <div class="modal-action">
          <button @click="closeDetailModal" class="btn">关闭</button>
        </div>
      </div>
    </dialog>

    <!-- 删除确认 Modal -->
    <dialog id="deleteModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">确认删除</h3>
        <div class="py-4">
          <p>确定要删除该场地吗？</p>
        </div>
        <div class="modal-action">
          <button @click="confirmDelete" class="btn btn-error">确认</button>
          <button @click="closeDeleteModal" class="btn">取消</button>
        </div>
      </div>
    </dialog>

    <!-- 添加场地 Modal -->
    <dialog id="addModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">添加场地</h3>
        <div class="py-4 space-y-4">
          <div class="form-control">
            <label class="label w-100">
              <span class="label-text">名称</span>
            </label>
            <input
              v-model="addForm.name"
              type="text"
              placeholder="场地名称"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label w-100">
              <span class="label-text">位置</span>
            </label>
            <input
              v-model="addForm.location"
              type="text"
              placeholder="场地位置"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label w-100">
              <span class="label-text">容纳人数</span>
            </label>
            <input
              v-model="addForm.capacity"
              type="number"
              placeholder="容纳人数"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label w-100">
              <span class="label-text">价格/小时</span>
            </label>
            <input
              v-model="addForm.pricePerHour"
              type="number"
              placeholder="价格/小时"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label w-100">
              <span class="label-text">描述</span>
            </label>
            <textarea
              v-model="addForm.description"
              placeholder="描述"
              class="textarea textarea-bordered"
            ></textarea>
          </div>
          <div class="form-control">
            <label class="label w-100">
              <span class="label-text">状态</span>
            </label>
            <select v-model="addForm.status" class="select select-bordered">
              <option value="available">可用</option>
              <option value="unavailable">不可用</option>
            </select>
          </div>
          <div class="form-control">
            <label class="label w-100">
              <span class="label-text">图片</span>
            </label>
            <input
              type="file"
              @change="handleFileChange"
              class="file-input file-input-bordered"
            />
          </div>
        </div>
        <div class="modal-action">
          <button @click="confirmAdd" class="btn btn-primary">确认</button>
          <button @click="closeAddModal" class="btn">取消</button>
        </div>
      </div>
    </dialog>

    <!-- 修改场地 Modal -->
    <dialog id="editModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">修改场地</h3>
        <div class="py-4 space-y-4">
          <div class="form-control">
            <label class="label w-100">
              <span class="label-text">名称</span>
            </label>
            <input
              v-model="editForm.name"
              type="text"
              placeholder="场地名称"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label w-100">
              <span class="label-text">位置</span>
            </label>
            <input
              v-model="editForm.location"
              type="text"
              placeholder="场地位置"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label w-100">
              <span class="label-text">容纳人数</span>
            </label>
            <input
              v-model="editForm.capacity"
              type="number"
              placeholder="容纳人数"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label w-100">
              <span class="label-text">价格/小时</span>
            </label>
            <input
              v-model="editForm.pricePerHour"
              type="number"
              placeholder="价格/小时"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label w-100">
              <span class="label-text">描述</span>
            </label>
            <textarea
              v-model="editForm.description"
              placeholder="描述"
              class="textarea textarea-bordered"
            ></textarea>
          </div>
          <div class="form-control">
            <label class="label w-100">
              <span class="label-text">状态</span>
            </label>
            <select v-model="editForm.status" class="select select-bordered">
              <option value="available">可用</option>
              <option value="unavailable">不可用</option>
            </select>
          </div>
          <div class="form-control">
            <label class="label w-100">
              <span class="label-text">图片</span>
            </label>
            <input
              type="file"
              @change="handleEditFileChange"
              class="file-input file-input-bordered"
            />
          </div>
        </div>
        <div class="modal-action">
          <button @click="confirmEdit" class="btn btn-primary">确认</button>
          <button @click="closeEditModal" class="btn">取消</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as Venue from "~/api/Venue";

definePageMeta({
  layout: "admin",
});

const searchForm = ref<Venue.SearchListForm>({
  name: "",
  location: "",
  capacity: "",
  minPrice: undefined,
  maxPrice: undefined,
  status: "",
});

const venueList = ref<Venue.VenueItem[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const selectedVenue = ref<Venue.VenueItem | null>(null);
const deleteVenueId = ref<number | string | null>(null);
const addForm = ref<Venue.createForm>({
  name: "",
  location: "",
  capacity: 0,
  pricePerHour: 0,
  description: "",
  image: new File([], ""),
  status: "available",
});
const editForm = ref<Venue.createForm & { venueID: number | string }>({
  venueID: "",
  name: "",
  location: "",
  capacity: 0,
  pricePerHour: 0,
  description: "",
  image: new File([], ""),
  status: "available",
});

const handleSearch = async () => {
  const res = await Venue.list(searchForm.value);
  venueList.value = res.data.data;
};

const handleReset = () => {
  searchForm.value = {
    name: "",
    location: "",
    capacity: "",
    minPrice: undefined,
    maxPrice: undefined,
    status: "",
  };
  handleSearch();
};

const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    handleSearch();
  }
};

const handleNextPage = () => {
  if (venueList.value.length === pageSize.value) {
    currentPage.value++;
    handleSearch();
  }
};

const openDetailModal = (venue: Venue.VenueItem) => {
  selectedVenue.value = venue;
  (document.getElementById("detailModal") as HTMLDialogElement).showModal();
};

const closeDetailModal = () => {
  (document.getElementById("detailModal") as HTMLDialogElement).close();
};

const openDeleteModal = (id: number | string) => {
  deleteVenueId.value = id;
  (document.getElementById("deleteModal") as HTMLDialogElement).showModal();
};

const closeDeleteModal = () => {
  deleteVenueId.value = null;
  (document.getElementById("deleteModal") as HTMLDialogElement).close();
};

const confirmDelete = async () => {
  if (deleteVenueId.value) {
    await Venue.del(deleteVenueId.value);
    closeDeleteModal();
    handleSearch();
  }
};

const openAddModal = () => {
  (document.getElementById("addModal") as HTMLDialogElement).showModal();
};

const closeAddModal = () => {
  addForm.value = {
    name: "",
    location: "",
    capacity: 0,
    pricePerHour: 0,
    description: "",
    image: new File([], ""),
    status: "available",
  };
  (document.getElementById("addModal") as HTMLDialogElement).close();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    addForm.value.image = target.files[0];
  }
};

const confirmAdd = async () => {
  await Venue.create(addForm.value);
  closeAddModal();
  handleSearch();
};

const openEditModal = (venue: Venue.VenueItem) => {
  editForm.value = {
    venueID: venue.venueID,
    name: venue.name,
    location: venue.location,
    capacity: venue.capacity,
    pricePerHour: venue.pricePerHour,
    description: venue.description,
    image: new File([], ""),
    status: venue.status as "available" | "unavailable",
  };
  (document.getElementById("editModal") as HTMLDialogElement).showModal();
};

const closeEditModal = () => {
  editForm.value = {
    venueID: "",
    name: "",
    location: "",
    capacity: 0,
    pricePerHour: 0,
    description: "",
    image: new File([], ""),
    status: "available",
  };
  (document.getElementById("editModal") as HTMLDialogElement).close();
};

const handleEditFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    editForm.value.image = target.files[0];
  }
};

const confirmEdit = async () => {
  await Venue.update(editForm.value.venueID, editForm.value);
  closeEditModal();
  handleSearch();
};

handleSearch();
</script>
