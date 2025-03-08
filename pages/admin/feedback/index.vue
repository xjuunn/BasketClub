<template>
  <div class="p-4">
    <!-- 搜索表单 -->
    <div class="card bg-base-100 shadow-sm p-4 mb-6">
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <div class="form-control">
          <label class="label">
            <span class="label-text">用户ID</span>
          </label>
          <input
            v-model="searchForm.userID"
            type="number"
            placeholder="请输入用户ID"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">反馈类型</span>
          </label>
          <select
            v-model="searchForm.feedbackType"
            class="select select-bordered w-full"
          >
            <option value="">全部</option>
            <option value="问题报告">问题报告</option>
            <option value="投诉">投诉</option>
            <option value="建议">建议</option>
          </select>
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
            <option value="pending">待处理</option>
            <option value="resolved">已解决</option>
            <option value="dismissed">已驳回</option>
          </select>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">关键词</span>
          </label>
          <input
            v-model="searchForm.keyword"
            type="text"
            placeholder="请输入关键词"
            class="input input-bordered w-full"
          />
        </div>
        <!-- <div class="form-control">
          <label class="label">
            <span class="label-text">开始日期</span>
          </label>
          <input
            v-model="searchForm.startDate"
            type="date"
            class="input input-bordered w-full"
          />
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">结束日期</span>
          </label>
          <input
            v-model="searchForm.endDate"
            type="date"
            class="input input-bordered w-full"
          />
        </div> -->
        <div class="form-control self-end">
          <div class="join">
            <button @click="handleSearch" class="btn btn-primary join-item">
              搜索
            </button>
            <button @click="handleReset" class="btn btn-ghost join-item">
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
              <th>反馈ID</th>
              <th>用户ID</th>
              <th>反馈类型</th>
              <th>内容</th>
              <th>状态</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in feedbackList" :key="item.feedbackID">
              <td>{{ item.feedbackID }}</td>
              <td>{{ item.userID }}</td>
              <td>{{ item.feedbackType }}</td>
              <td class="max-w-[200px] truncate" :title="item.content">
                {{ item.content }}
              </td>
              <td>
                <span
                  :class="{
                    'badge badge-info': item.status === 'pending',
                    'badge badge-success': item.status === 'resolved',
                    'badge badge-error': item.status === 'dismissed',
                  }"
                >
                  {{ item.status }}
                </span>
              </td>
              <td>{{ item.createdAt }}</td>
              <td>
                <div class="join">
                  <button
                    @click="openDetailModal(item)"
                    class="btn btn-sm btn-info join-item"
                  >
                    详情
                  </button>
                  <button
                    @click="openDeleteModal(item.feedbackID ?? -1)"
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
        :disabled="feedbackList.length < pageSize"
        class="btn join-item"
      >
        下一页
      </button>
    </div>

    <!-- 详情 Modal -->
    <dialog id="detailModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">反馈详情</h3>
        <div class="mt-4 space-y-2">
          <p>
            <span class="font-bold">反馈ID:</span>
            {{ selectedFeedback?.feedbackID }}
          </p>
          <p>
            <span class="font-bold">用户ID:</span>
            {{ selectedFeedback?.userID }}
          </p>
          <p>
            <span class="font-bold">反馈类型:</span>
            {{ selectedFeedback?.feedbackType }}
          </p>
          <p>
            <span class="font-bold">内容:</span> {{ selectedFeedback?.content }}
          </p>
          <p>
            <span class="font-bold">状态:</span> {{ selectedFeedback?.status }}
          </p>
          <p>
            <span class="font-bold">创建时间:</span>
            {{ selectedFeedback?.createdAt }}
          </p>
          <p>
            <span class="font-bold">更新时间:</span>
            {{ selectedFeedback?.updatedAt }}
          </p>
        </div>
        <div class="modal-action">
          <button @click="closeDetailModal" class="btn btn-ghost">关闭</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>关闭</button>
      </form>
    </dialog>

    <!-- 删除 Modal -->
    <dialog id="deleteModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">确认删除</h3>
        <p class="py-4">确定要删除该反馈吗？</p>
        <div class="modal-action">
          <button @click="handleDelete" class="btn btn-error">删除</button>
          <button @click="closeDeleteModal" class="btn btn-ghost">取消</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>关闭</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import * as Feedback from "~/api/Feedback";

definePageMeta({
  layout: "admin",
});

interface SearchForm {
  userID?: number;
  feedbackType?: "问题报告" | "投诉" | "建议";
  status?: "pending" | "resolved" | "dismissed";
  keyword?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  size?: number;
}

const searchForm = ref<SearchForm>({
  page: 1,
  size: 15,
});

const feedbackList = ref<Feedback.FeedBackListItem[]>([]);
const currentPage = ref(1);
const pageSize = ref(15);
const selectedFeedback = ref<Feedback.FeedBackListItem | null>(null);
const deleteId = ref<number | string>("");

const fetchFeedbackList = async () => {
  const res = await Feedback.list(searchForm.value);
  feedbackList.value = res.data.data.list;
};

const handleSearch = () => {
  currentPage.value = 1;
  fetchFeedbackList();
};

const handleReset = () => {
  searchForm.value = { page: 1, size: 15 };
  fetchFeedbackList();
};

const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    searchForm.value.page = currentPage.value;
    fetchFeedbackList();
  }
};

const handleNextPage = () => {
  if (feedbackList.value.length === pageSize.value) {
    currentPage.value++;
    searchForm.value.page = currentPage.value;
    fetchFeedbackList();
  }
};

const openDetailModal = (item: Feedback.FeedBackListItem) => {
  selectedFeedback.value = item;
  (document.getElementById("detailModal") as HTMLDialogElement).showModal();
};

const closeDetailModal = () => {
  (document.getElementById("detailModal") as HTMLDialogElement).close();
};

const openDeleteModal = (id: number | string) => {
  deleteId.value = id;
  (document.getElementById("deleteModal") as HTMLDialogElement).showModal();
};

const closeDeleteModal = () => {
  (document.getElementById("deleteModal") as HTMLDialogElement).close();
};

const handleDelete = async () => {
  await Feedback.del(deleteId.value);
  closeDeleteModal();
  fetchFeedbackList();
};

fetchFeedbackList();
</script>
