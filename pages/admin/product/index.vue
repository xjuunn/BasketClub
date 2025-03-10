<template>
  <div class="p-4">
    <div class="grid gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
      <div class="form-control">
        <label class="label">
          <span class="label-text">商品名称</span>
        </label>
        <input
          v-model="searchParams.name"
          type="text"
          class="input input-bordered"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">商品分类</span>
        </label>
        <input
          v-model="searchParams.category"
          type="number"
          class="input input-bordered"
        />
      </div>
      <div class="join self-end">
        <button @click="handleSearch" class="btn join-item btn-primary">
          搜索
        </button>
        <button @click="handleReset" class="btn join-item btn-outline">
          重置
        </button>
      </div>
    </div>

    <div class="overflow-x-auto bg-base-100 rounded-box shadow">
      <table class="table">
        <thead>
          <tr>
            <th>商品名称</th>
            <th>价格</th>
            <th>库存</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.productID">
            <td>
              <div class="flex items-center gap-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img
                      :src="Product.getImgUrl(item.imageUrl ?? '')"
                      alt="商品图片"
                    />
                  </div>
                </div>
                <div class="font-bold truncate">{{ item.name }}</div>
              </div>
            </td>
            <td class="truncate">{{ item.price }}</td>
            <td class="truncate">{{ item.stockQuantity }}</td>
            <td>
              <div class="join">
                <button
                  @click="showDetail(item)"
                  class="btn join-item btn-sm btn-info"
                >
                  详情
                </button>
                <button
                  @click="showEditModal(item)"
                  class="btn join-item btn-sm btn-warning"
                >
                  编辑
                </button>
                <button
                  @click="confirmDelete(item.productID ?? -1)"
                  class="btn join-item btn-sm btn-error"
                >
                  删除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="join flex justify-center my-4">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="join-item btn"
      >
        上一页
      </button>
      <button
        @click="nextPage"
        :disabled="products.length < pageSize"
        class="join-item btn"
      >
        下一页
      </button>
    </div>

    <button
      @click="showCreateModal"
      class="btn btn-circle btn-primary fixed bottom-8 right-8"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
    </button>

    <dialog id="modal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{{ modalTitle }}</h3>
        <div class="py-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">商品名称</span>
              </label>
              <input
                v-model="formData.name"
                type="text"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">商品价格</span>
              </label>
              <input
                v-model.number="formData.price"
                type="number"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">商品库存</span>
              </label>
              <input
                v-model.number="formData.stockQuantity"
                type="number"
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">商品分类</span>
              </label>
              <input
                v-model.number="formData.category"
                type="number"
                class="input input-bordered"
              />
            </div>
            <div class="form-control col-span-2">
              <label class="label">
                <span class="label-text">商品描述</span>
              </label>
              <textarea
                v-model="formData.description"
                class="textarea textarea-bordered h-24"
              ></textarea>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">商品图片</span>
              </label>
              <input
                @change="handleFileUpload"
                type="file"
                class="file-input file-input-bordered"
              />
            </div>
          </div>
        </div>
        <div class="modal-action">
          <button @click="handleSubmit" class="btn btn-primary">提交</button>
          <form method="dialog">
            <button class="btn">关闭</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
import * as Product from "~/api/Product";

const pageSize = 15;
const currentPage = ref(1);
const searchParams = reactive(new Product.SearchForm());
const products = ref<Product.ProductItem[]>([]);
const modalTitle = ref("");
const formData = reactive<Product.CreateForm | Product.UpdateForm>({
  name: "",
  description: "",
  price: 0,
  stockQuantity: 0,
  image: new File([], ""),
  category: 0,
  productID: 0,
});

const loadData = async () => {
  const res = await Product.list({ ...searchParams, page: currentPage.value });
  products.value = res.data.data;
};

const handleSearch = () => {
  currentPage.value = 1;
  loadData();
};

const handleReset = () => {
  Object.assign(searchParams, new Product.SearchForm());
  loadData();
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    loadData();
  }
};

const nextPage = () => {
  currentPage.value++;
  loadData();
};

const showCreateModal = () => {
  modalTitle.value = "新建商品";
  Object.assign(formData, {
    name: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    image: new File([], ""),
    category: 0,
    productID: 0,
  });
  (window as any).modal.showModal();
};

const showEditModal = (item: Product.ProductItem) => {
  modalTitle.value = "编辑商品";
  Object.assign(formData, {
    ...item,
    category: Number(item.category),
    productID: item.productID,
  });
  (window as any).modal.showModal();
};

const handleFileUpload = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files?.length) {
    formData.image = input.files[0];
  }
};

const handleSubmit = async () => {
  
  if (formData.productID) {
    await Product.update(formData as Product.UpdateForm);
  } else {
    await Product.create(formData as Product.CreateForm);
  }
  (window as any).modal.close();
  loadData();
};

const confirmDelete = async (id: number) => {
  if (confirm("确定要删除该商品吗？")) {
    await Product.del(id);
    loadData();
  }
};

const showDetail = (item: Product.ProductItem) => {
  alert(`商品详情：
名称：${item.name}
价格：${item.price}
库存：${item.stockQuantity}
描述：${item.description}`);
};

onMounted(loadData);
</script>
