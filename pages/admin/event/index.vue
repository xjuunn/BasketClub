<template>
  <div class="p-4">
    <!-- 搜索表单 -->
    <div class="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
      <div class="form-control w-full md:w-auto">
        <label class="label">
          <span class="label-text">赛事名称</span>
        </label>
        <input
          v-model="searchForm.name"
          type="text"
          placeholder="请输入赛事名称"
          class="input input-bordered"
        />
      </div>
      <div class="form-control w-full md:w-auto">
        <label class="label">
          <span class="label-text">赛事地点</span>
        </label>
        <input
          v-model="searchForm.location"
          type="text"
          placeholder="请输入赛事地点"
          class="input input-bordered"
        />
      </div>
      <div class="form-control w-full md:w-auto">
        <label class="label">
          <span class="label-text">赛事状态</span>
        </label>
        <select v-model="searchForm.status" class="select select-bordered">
          <option value="">全部状态</option>
          <option value="upcoming">未开始</option>
          <option value="ongoing">进行中</option>
          <option value="finished">已结束</option>
        </select>
      </div>
      <div class="form-control w-full md:w-auto">
        <label class="label">
          <span class="label-text">开始时间</span>
        </label>
        <input
          v-model="searchForm.startDate"
          type="date"
          class="input input-bordered"
        />
      </div>
      <div class="form-control w-full md:w-auto">
        <label class="label">
          <span class="label-text">结束时间</span>
        </label>
        <input
          v-model="searchForm.endDate"
          type="date"
          class="input input-bordered"
        />
      </div>

      <div class="join form-control w-full md:w-auto mt-7">
        <button @click="handleSearch" class="btn btn-sm join-item btn-primary">
          搜索
        </button>
        <button @click="handleReset" class="btn btn-sm join-item btn-secondary">
          重置
        </button>
        <button @click="openAddModal" class="btn btn-sm join-item btn-success">
          新增赛事
        </button>
      </div>
    </div>

    <!-- 新增赛事 Modal -->
    <dialog id="addModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">新增赛事</h3>
        <div class="py-4 space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">赛事名称</span>
            </label>
            <input
              v-model="addForm.name"
              type="text"
              placeholder="请输入赛事名称"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">赛事描述</span>
            </label>
            <textarea
              v-model="addForm.description"
              placeholder="请输入赛事描述"
              class="textarea textarea-bordered"
            ></textarea>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">开始时间</span>
            </label>
            <input
              v-model="addForm.startDate"
              type="datetime-local"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">结束时间</span>
            </label>
            <input
              v-model="addForm.endDate"
              type="datetime-local"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">赛事地点</span>
            </label>
            <input
              v-model="addForm.location"
              type="text"
              placeholder="请输入赛事地点"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">赛事状态</span>
            </label>
            <select v-model="addForm.status" class="select select-bordered">
              <option value="upcoming">未开始</option>
              <option value="ongoing">进行中</option>
              <option value="finished">已结束</option>
            </select>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">赛事图片</span>
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

    <!-- <dialog id="addModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">新增赛事</h3>
        <div class="py-4 space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">赛事名称</span>
            </label>
            <input
              v-model="addForm.name"
              type="text"
              placeholder="请输入赛事名称"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">赛事描述</span>
            </label>
            <textarea
              v-model="addForm.description"
              placeholder="请输入赛事描述"
              class="textarea textarea-bordered"
            ></textarea>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">开始时间</span>
            </label>
            <input
              v-model="addForm.startDate"
              type="datetime-local"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">结束时间</span>
            </label>
            <input
              v-model="addForm.endDate"
              type="datetime-local"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">赛事地点</span>
            </label>
            <input
              v-model="addForm.location"
              type="text"
              placeholder="请输入赛事地点"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">赛事状态</span>
            </label>
            <select v-model="addForm.status" class="select select-bordered">
              <option value="upcoming">未开始</option>
              <option value="ongoing">进行中</option>
              <option value="finished">已结束</option>
            </select>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">赛事图片</span>
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
    </dialog> -->
    <!-- 数据列表 -->
    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>赛事名称</th>
            <th>地点</th>
            <th>开始时间</th>
            <th>结束时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in eventList" :key="event.eventID">
            <td class="max-w-[150px] truncate" :title="event.name">
              {{ event.name }}
            </td>
            <td class="max-w-[150px] truncate" :title="event.location">
              {{ event.location }}
            </td>
            <td>{{ event.startDate }}</td>
            <td>{{ event.endDate }}</td>
            <td>
              <span
                :class="{
                  'badge badge-info': event.status === 'upcoming',
                  'badge badge-success': event.status === 'ongoing',
                  'badge badge-error': event.status === 'finished',
                }"
              >
                {{
                  event.status === "upcoming"
                    ? "未开始"
                    : event.status === "ongoing"
                    ? "进行中"
                    : "已结束"
                }}
              </span>
            </td>
            <td>
              <div class="join">
                <button
                  @click="openDetailModal(event)"
                  class="btn btn-sm btn-info join-item"
                >
                  详情
                </button>
                <button
                  @click="openDeleteModal(event.eventID)"
                  class="btn btn-sm btn-error join-item"
                >
                  删除
                </button>
                <button
                  @click="openEditModal(event)"
                  class="btn btn-sm btn-warning join-item"
                >
                  修改
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
          :disabled="eventList.length < pageSize"
          class="btn join-item"
        >
          下一页
        </button>
      </div>
    </div>

    <!-- 赛事详情 Modal -->
    <dialog id="detailModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">赛事详情</h3>
        <div class="py-4 space-y-4">
          <div class="flex items-center">
            <span class="font-semibold w-24">名称:</span>
            <span>{{ selectedEvent?.name }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold w-24">地点:</span>
            <span>{{ selectedEvent?.location }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold w-24">开始时间:</span>
            <span>{{ selectedEvent?.startDate }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold w-24">结束时间:</span>
            <span>{{ selectedEvent?.endDate }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold w-24">状态:</span>
            <span
              :class="{
                'badge badge-info': selectedEvent?.status === 'upcoming',
                'badge badge-success': selectedEvent?.status === 'ongoing',
                'badge badge-error': selectedEvent?.status === 'finished',
              }"
            >
              {{
                selectedEvent?.status === "upcoming"
                  ? "未开始"
                  : selectedEvent?.status === "ongoing"
                  ? "进行中"
                  : "已结束"
              }}
            </span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold w-24">描述:</span>
            <span>{{ selectedEvent?.description }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold w-24">图片:</span>
            <img
              :src="Event.getImgUrl(selectedEvent?.imageUrl ?? '')"
              alt="赛事图片"
              class="w-32 h-32 object-cover rounded-lg"
            />
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
          <p>确定要删除该赛事吗？</p>
        </div>
        <div class="modal-action">
          <button @click="confirmDelete" class="btn btn-error">确认</button>
          <button @click="closeDeleteModal" class="btn">取消</button>
        </div>
      </div>
    </dialog>
    <dialog id="editModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">修改赛事</h3>
        <div class="py-4 space-y-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text">赛事名称</span>
            </label>
            <input
              v-model="editForm.name"
              type="text"
              placeholder="请输入赛事名称"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">赛事描述</span>
            </label>
            <textarea
              v-model="editForm.description"
              placeholder="请输入赛事描述"
              class="textarea textarea-bordered"
            ></textarea>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">开始时间</span>
            </label>
            <input
              v-model="editForm.startDate"
              type="datetime-local"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">结束时间</span>
            </label>
            <input
              v-model="editForm.endDate"
              type="datetime-local"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">赛事地点</span>
            </label>
            <input
              v-model="editForm.location"
              type="text"
              placeholder="请输入赛事地点"
              class="input input-bordered"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">赛事状态</span>
            </label>
            <select v-model="editForm.status" class="select select-bordered">
              <option value="upcoming">未开始</option>
              <option value="ongoing">进行中</option>
              <option value="finished">已结束</option>
            </select>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">赛事图片</span>
            </label>
            <input
              type="file"
              @change="handleEditFileChange"
              class="file-input file-input-bordered"
            />
          </div>
        </div>
        <div class="modal-action">
          <button @click="confirmEdit" class="btn btn-primary">确认修改</button>
          <button @click="closeEditModal" class="btn">取消</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as Event from "~/api/Event";

definePageMeta({
  layout: "admin",
});

const searchForm = ref<Event.SearchEventForm>({
  name: "",
  location: "",
  status: "",
  startDate: undefined,
  endDate: undefined,
  page: 1,
  size: 10,
});

const eventList = ref<Event.EventItem[]>([]);
const currentPage = ref(1);
const pageSize = ref(10);
const selectedEvent = ref<Event.EventItem | null>(null);
const deleteEventId = ref<number | string | null>(null);

const handleSearch = async () => {
  const res = await Event.list(searchForm.value);
  eventList.value = res.data.data;
};

const handleReset = () => {
  searchForm.value = {
    name: "",
    location: "",
    status: "",
    startDate: undefined,
    endDate: undefined,
    page: 1,
    size: 10,
  };
  handleSearch();
};

const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    searchForm.value.page = currentPage.value;
    handleSearch();
  }
};

const handleNextPage = () => {
  if (eventList.value.length === pageSize.value) {
    currentPage.value++;
    searchForm.value.page = currentPage.value;
    handleSearch();
  }
};

const openDetailModal = (event: Event.EventItem) => {
  selectedEvent.value = event;
  (document.getElementById("detailModal") as HTMLDialogElement).showModal();
};

const closeDetailModal = () => {
  (document.getElementById("detailModal") as HTMLDialogElement).close();
};

const openDeleteModal = (id: number | string) => {
  deleteEventId.value = id;
  (document.getElementById("deleteModal") as HTMLDialogElement).showModal();
};

const closeDeleteModal = () => {
  deleteEventId.value = null;
  (document.getElementById("deleteModal") as HTMLDialogElement).close();
};

const confirmDelete = async () => {
  if (deleteEventId.value) {
    await Event.del(deleteEventId.value);
    closeDeleteModal();
    handleSearch();
  }
};
const addForm = ref<Event.CreateEventForm>({
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  location: "",
  status: "upcoming",
  image: new File([], ""),
});

const openAddModal = () => {
  (document.getElementById("addModal") as HTMLDialogElement).showModal();
};

const closeAddModal = () => {
  addForm.value = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    status: "upcoming",
    image: new File([], ""),
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
  addForm.value.endDate = formatDate(new Date(addForm.value.endDate));
  addForm.value.startDate = formatDate(new Date(addForm.value.startDate));
  try {
    await Event.create(addForm.value);
    closeAddModal();
    handleSearch(); // 刷新列表
  } catch (error) {
    console.error("新增赛事失败:", error);
  }
};
handleSearch();
import dayjs from "dayjs";
function formatDate2(date: Date): string {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}

function formatDate(date: Date): string {
  return date
    .toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(/\//g, "-"); // 处理分隔符
}
const editForm = ref<Event.CreateEventForm & { eventID: number | string }>({
  eventID: "",
  name: "",
  description: "",
  startDate: "",
  endDate: "",
  location: "",
  status: "upcoming",
  image: new File([], ""),
});

const openEditModal = (event: Event.EventItem) => {
  editForm.value = {
    eventID: event.eventID,
    name: event.name,
    description: event.description,
    startDate: "",
    endDate: "",
    location: event.location,
    status: event.status as "upcoming" | "ongoing" | "finished",
    image: new File([], ""),
  };
  (document.getElementById("editModal") as HTMLDialogElement).showModal();
};

const closeEditModal = () => {
  editForm.value = {
    eventID: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    status: "upcoming",
    image: new File([], ""),
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
  if (editForm.value.eventID) {
    editForm.value.endDate = formatDate(new Date(editForm.value.endDate));
    editForm.value.startDate = formatDate(new Date(editForm.value.startDate));
    await Event.update(editForm.value.eventID, editForm.value);
    closeEditModal();
    handleSearch();
  }
};
</script>
