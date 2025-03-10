<template>
  <div
    class="relative bg-base-100 w-full z-40 pt-10 pb-20 flex flex-col items-center justify-center"
  >
    <h2 class="text-2xl font-bold text-center mb-4">商品</h2>
    <div class="w-full max-w-6xl px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in listdata"
          :key="product.productID"
          class="card bg-base-100 shadow-xl"
        >
          <figure>
            <img
              :src="getImgUrl(product.imageUrl ?? '')"
              alt="商品图片"
              class="w-full h-48 object-cover"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{{ product.name }}</h2>
            <p class="text-base-content">{{ product.description }}</p>
            <div class="flex justify-between items-center">
              <p class="text-secondary">价格: ¥{{ product.price }}</p>
              <p class="text-secondary">库存: {{ product.stockQuantity }}</p>
            </div>
            <div class="card-actions justify-end">
              <button class="btn btn-primary" @click="showBuyModal(product)">
                购买
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      class="modal modal-open"
      @click.self="showModal = false"
    >
      <div class="modal-box">
        <h3 class="font-bold text-lg text-primary">购买商品</h3>
        <div class="space-y-4 mt-4">
          <div class="form-control">
            <label class="label w-20">
              <span class="label-text text-secondary">商品名</span>
            </label>
            <input
              type="text"
              class="input input-bordered"
              :value="selectedProduct?.name"
              disabled
            />
          </div>
          <div class="form-control">
            <label class="label w-20">
              <span class="label-text text-secondary">价格</span>
            </label>
            <input
              type="text"
              class="input input-bordered"
              :value="selectedProduct?.price"
              disabled
            />
          </div>
          <div class="form-control">
            <label class="label w-20">
              <span class="label-text text-secondary">库存</span>
            </label>
            <input
              type="text"
              class="input input-bordered"
              :value="selectedProduct?.stockQuantity"
              disabled
            />
          </div>
          <div class="form-control">
            <label class="label w-20">
              <span class="label-text text-secondary">购买数量</span>
            </label>
            <input
              type="number"
              class="input input-bordered"
              v-model="quantity"
              min="1"
              :max="selectedProduct?.stockQuantity"
            />
          </div>
          <!-- <div class="form-control">
            <label class="label w-20">
              <span class="label-text text-secondary">支付方式</span>
            </label>
            <select
              class="select select-bordered w-full"
              v-model="paymentMethod"
            >
              <option value="现金">现金</option>
              <option value="信用卡">信用卡</option>
              <option value="支付宝">支付宝</option>
              <option value="微信">微信</option>
              <option value="其他">其他</option>
            </select>
          </div> -->
          <div class="modal-action">
            <button
              type="button"
              class="btn btn-ghost"
              @click="showModal = false"
            >
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="handleBuy">
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as Product from "~/api/Product";
import * as Order from "~/api/Order";
let listdata: Ref<Product.ProductItem[]> = ref([]);
let showModal = ref(false);
let selectedProduct: Ref<Product.ProductItem | undefined> = ref();
let quantity = ref(1);
let paymentMethod = ref("现金");
let { user } = useUserStore();
let { successToast, errorToast } = useToastStore();

onMounted(() => {
  initList();
});

async function initList() {
  let { data } = await Product.list({ page: 1, size: 10 });
  listdata.value = data.data;
}

function getImgUrl(name: string) {
  return Product.getImgUrl(name);
}

function showBuyModal(product: Product.ProductItem) {
  selectedProduct.value = product;
  quantity.value = 1;
  paymentMethod.value = "现金";
  showModal.value = true;
}

async function handleBuy() {
  if (!selectedProduct.value) {
    errorToast("未选择商品");
    return;
  }

  if (
    quantity.value < 1 ||
    // @ts-ignore
    quantity.value > selectedProduct.value.stockQuantity
  ) {
    errorToast("购买数量无效");
    return;
  }
  // @ts-ignore
  const totalAmount = selectedProduct.value.price * quantity.value;

  try {
    await Order.createProductOrder({
      productID: selectedProduct.value.productID ?? -1,
      userID: user.value.userID ?? -1,
      quantity: quantity.value,
      totalAmount: totalAmount,
      saleDate: new Date().toISOString(),
      // @ts-ignore
      paymentMethod: paymentMethod.value ?? "其他",
      status: "pending",
      discount: 0,
    });
    console.log(totalAmount);

    successToast("购买成功");
    showModal.value = false;
  } catch (error) {
    errorToast("购买失败");
  }
}
</script>
