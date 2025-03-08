<template>
  <div class="p-4">
    <!-- 搜索表单 -->
    <div class="card bg-base-100 shadow-sm p-4 mb-6">
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <div class="form-control">
          <label class="label">
            <span class="label-text">订单类型</span>
          </label>
          <select
            v-model="searchForm.orderType"
            class="select select-bordered w-full"
          >
            <option value="venue">场地预约</option>
            <option value="product">商品订单</option>
          </select>
        </div>
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
              <th>订单ID</th>
              <th>用户ID</th>
              <th>订单类型</th>
              <th>总金额</th>
              <th>订单日期</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderList" :key="item.orderID">
              <td>{{ item.orderID }}</td>
              <td>{{ item.userID }}</td>
              <td>
                {{ item.orderType === "venue" ? "场地预约" : "商品订单" }}
              </td>
              <td>{{ item.totalAmount }}</td>
              <td>{{ item.orderDate }}</td>
              <td>
                <span
                  :class="{
                    'badge badge-info': item.status === 'pending',
                    'badge badge-success': item.status === 'paid',
                    'badge badge-warning': item.status === 'shipped',
                    'badge badge-error': item.status === 'cancelled',
                    'badge badge-neutral': item.status === 'completed',
                  }"
                >
                  {{ item.status }}
                </span>
              </td>
              <td>
                <div class="join">
                  <button
                    @click="openDetailModal(item)"
                    class="btn btn-sm btn-info join-item"
                  >
                    详情
                  </button>
                  <button
                    @click="openDeleteModal(item.orderID ?? -1)"
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
        :disabled="orderList.length < pageSize"
        class="btn join-item"
      >
        下一页
      </button>
    </div>

    <!-- 详情 Modal -->
    <dialog id="detailModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">订单详情</h3>
        <div class="mt-4 space-y-2">
          <p>
            <span class="font-bold">订单ID:</span> {{ selectedOrder?.orderID }}
          </p>
          <p>
            <span class="font-bold">用户ID:</span> {{ selectedOrder?.userID }}
          </p>
          <p>
            <span class="font-bold">订单类型:</span>
            {{ selectedOrder?.orderType === "venue" ? "场地预约" : "商品订单" }}
          </p>
          <p>
            <span class="font-bold">总金额:</span>
            {{ selectedOrder?.totalAmount }}
          </p>
          <p>
            <span class="font-bold">订单日期:</span>
            {{ selectedOrder?.orderDate }}
          </p>
          <p>
            <span class="font-bold">状态:</span> {{ selectedOrder?.status }}
          </p>
          <p v-if="selectedOrder?.orderType === 'venue'">
            <span class="font-bold">场地名称:</span>
            {{ selectedOrder?.venueName }}
          </p>
          <p v-if="selectedOrder?.orderType === 'venue'">
            <span class="font-bold">场地位置:</span>
            {{ selectedOrder?.venueLocation }}
          </p>
          <p v-if="selectedOrder?.orderType === 'product'">
            <span class="font-bold">商品名称:</span>
            {{ selectedOrder?.productName }}
          </p>
          <p v-if="selectedOrder?.orderType === 'product'">
            <span class="font-bold">商品价格:</span>
            {{ selectedOrder?.productPrice }}
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
        <p class="py-4">确定要删除该订单吗？</p>
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
import * as Order from "~/api/Order";

definePageMeta({
  layout: "admin",
});

interface SearchForm {
  orderType: "product" | "venue";
  page: number;
  size: number;
}

const searchForm = ref<SearchForm>({
  orderType: "venue",
  page: 1,
  size: 15,
});

const orderList = ref<Order.OrderInfo[]>([]);
const currentPage = ref(1);
const pageSize = ref(15);
const selectedOrder = ref<Order.OrderInfo | null>(null);
const deleteId = ref<number | string>("");

const fetchOrderList = async () => {
  const res = await Order.list(searchForm.value);
  orderList.value = res.data.data;
};

const handleSearch = () => {
  currentPage.value = 1;
  fetchOrderList();
};

const handleReset = () => {
  searchForm.value = { orderType: "venue", page: 1, size: 15 };
  fetchOrderList();
};

const handlePrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    searchForm.value.page = currentPage.value;
    fetchOrderList();
  }
};

const handleNextPage = () => {
  if (orderList.value.length === pageSize.value) {
    currentPage.value++;
    searchForm.value.page = currentPage.value;
    fetchOrderList();
  }
};

const openDetailModal = (item: Order.OrderInfo) => {
  selectedOrder.value = item;
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
  await Order.del(deleteId.value);
  closeDeleteModal();
  fetchOrderList();
};

fetchOrderList();
</script>
