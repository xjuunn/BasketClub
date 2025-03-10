<template>
  <div class="p-4">
    <!-- 数据统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">总订单数</h2>
          <p class="text-3xl font-bold">{{ stats.totalOrders }}</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">总销售额</h2>
          <p class="text-3xl font-bold">¥{{ stats.totalRevenue }}</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">热门赛事</h2>
          <p class="text-3xl font-bold">{{ stats.topEvent }}</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">用户反馈</h2>
          <p class="text-3xl font-bold">{{ stats.totalFeedbacks }}</p>
        </div>
      </div>
    </div>

    <!-- 总收入板块 -->
    <div class="card bg-base-100 shadow mb-8">
      <div class="card-body">
        <h2 class="card-title">总收入统计</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="text-center">
            <p class="text-xl font-bold">场地总收入</p>
            <p class="text-3xl">¥{{ totalVenueRevenue }}</p>
          </div>
          <div class="text-center">
            <p class="text-xl font-bold">商品总收入</p>
            <p class="text-3xl">¥{{ totalProductRevenue }}</p>
          </div>
          <div class="text-center">
            <p class="text-xl font-bold">赛事总收入</p>
            <p class="text-3xl">¥{{ totalEventRevenue }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 图表展示 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">销售统计</h2>
          <div ref="salesChart" class="w-full h-64"></div>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">订单统计</h2>
          <div ref="ordersChart" class="w-full h-64"></div>
        </div>
      </div>
    </div>

    <!-- 重要数据展示 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">热门商品</h2>
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>商品名称</th>
                  <th>销售额</th>
                  <th>销量</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in topProducts" :key="product.productID">
                  <td>{{ product.productName }}</td>
                  <td>¥{{ product.totalRevenue }}</td>
                  <td>{{ product.salesCount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h2 class="card-title">热门场地</h2>
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>场地名称</th>
                  <th>预订次数</th>
                  <th>总收入</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="venue in topVenues" :key="venue.venueID">
                  <td>{{ venue.venueName }}</td>
                  <td>{{ venue.bookingCount }}</td>
                  <td>¥{{ venue.totalRevenue }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import * as Dataanalysis from '~/api/Dataanalysis';

definePageMeta({
  layout: 'admin',
});

const stats = ref({
  totalOrders: 0,
  totalRevenue: 0,
  topEvent: '',
  totalFeedbacks: 0,
});

const topProducts = ref<Dataanalysis.TopProduct[]>([]);
const topVenues = ref<Dataanalysis.TopVenue[]>([]);
const totalVenueRevenue = ref(0);
const totalProductRevenue = ref(0);
const totalEventRevenue = ref(0);

const salesChart = ref<HTMLElement | null>(null);
const ordersChart = ref<HTMLElement | null>(null);

onMounted(() => {
  initData();
  initCharts();
});

async function initData() {
  try {
    const { data } = await Dataanalysis.getdata();
    console.log(data); // 打印接口返回的数据

    stats.value = {
      totalOrders: data?.totalOrders || 0,
      totalRevenue: data?.totalRevenue || 0,
      topEvent: data?.topEvent || '',
      totalFeedbacks: data?.totalFeedbacks || 0,
    };

    topProducts.value = data?.productAnalysis?.topProducts || [];
    topVenues.value = data?.venueAnalysis?.topVenues || [];

    // 计算总收入
    totalVenueRevenue.value = topVenues.value.reduce((sum, venue) => sum + (venue?.totalRevenue || 0), 0);
    totalProductRevenue.value = topProducts.value.reduce((sum, product) => sum + (product?.totalRevenue || 0), 0);
    totalEventRevenue.value = data?.eventAnalysis?.topEvents?.reduce((sum, event) => sum + (event?.totalRevenue || 0), 0) || 0;
  } catch (error) {
    console.error('初始化数据失败:', error);
  }
}

function initCharts() {
  if (salesChart.value && ordersChart.value) {
    const salesChartInstance = echarts.init(salesChart.value);
    salesChartInstance.setOption({
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110],
          type: 'bar',
        },
      ],
    });

    const ordersChartInstance = echarts.init(ordersChart.value);
    ordersChartInstance.setOption({
      xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [10, 20, 15, 8, 7, 11],
          type: 'line',
        },
      ],
    });
  }
}
</script>