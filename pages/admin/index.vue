<template>
  <div class="p-6 bg-base-200 min-h-screen">
    <!-- 数据统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div class="card-body">
          <h2 class="card-title text-primary">运行时间</h2>
          <p class="text-3xl font-bold text-secondary">{{ starttime }}</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div class="card-body">
          <h2 class="card-title text-primary">总销售额</h2>
          <p class="text-3xl font-bold text-accent">
            ¥{{
              Math.ceil(
                stats.totalEventRevenue +
                  stats.totalProductRevenue +
                  stats.totalVenueRevenue
              )
            }}
          </p>
        </div>
      </div>
      <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div class="card-body">
          <h2 class="card-title text-primary">在线用户</h2>
          <p class="text-3xl font-bold text-info">{{ onlineUserNum }}</p>
        </div>
      </div>
      <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div class="card-body">
          <h2 class="card-title text-primary">用户反馈</h2>
          <p class="text-3xl font-bold text-warning">{{ stats.totalFeedbacks }}</p>
        </div>
      </div>
    </div>

    <!-- 总收入板块 -->
    <div class="card bg-base-100 shadow-lg mb-8">
      <div class="card-body">
        <h2 class="card-title text-primary">总收入统计</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center p-4 bg-base-200 rounded-lg">
            <p class="text-xl font-bold text-secondary">场地总收入</p>
            <p class="text-3xl text-accent">¥{{ Math.ceil(stats.totalVenueRevenue) }}</p>
          </div>
          <div class="text-center p-4 bg-base-200 rounded-lg">
            <p class="text-xl font-bold text-secondary">商品总收入</p>
            <p class="text-3xl text-accent">¥{{ Math.ceil(stats.totalProductRevenue) }}</p>
          </div>
          
        </div>
      </div>
    </div>

    <!-- 图表展示 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <h2 class="card-title text-primary">销售统计</h2>
          <div ref="salesChart" class="w-full h-96"></div>
        </div>
      </div>
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <h2 class="card-title text-primary">比赛报名</h2>
          <div ref="ordersChart" class="w-full h-96"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import * as Dataanalysis from "~/api/Dataanalysis";
import type { ProductItem } from "~/api/Product";
import * as Feedback from "~/api/Feedback";
definePageMeta({
  layout: "admin",
});

const stats = ref({
  totalOrders: 0,
  totalProductRevenue: 0,
  totalVenueRevenue: 0,
  topEvent: "",
  totalEventRevenue: 0,
  totalFeedbacks: 0,
});

const topProducts = ref<Dataanalysis.TopProduct[]>([]);
const topVenues = ref<Dataanalysis.TopVenue[]>([]);
let onlineUserNum = ref(0);
const salesChart = ref<HTMLElement | null>(null);
const ordersChart = ref<HTMLElement | null>(null);
let analysisData: Dataanalysis.Data | undefined;
let starttime = ref("");
let timer: any;
let time1 = 0;
onMounted(async () => {
  await initData();
  await initCharts();
  timer = setInterval(() => {
    let time2 = Date.now();
    const diff = time2 - time1;
    const seconds = Math.floor(diff / 1000); // 总秒数
    const minutes = Math.floor(seconds / 60); // 总分钟数
    const hours = Math.floor(minutes / 60); // 总小时数
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;
    starttime.value = `${remainingHours}:${remainingMinutes}:${remainingSeconds}`;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

async function initData() {
  const { data } = await Dataanalysis.getdata();
  analysisData = data.data;

  stats.value.totalProductRevenue = 0;

  data.data.productAnalysis.topProducts.map((item) => {
    stats.value.totalProductRevenue += item.totalRevenue ?? 0;
  });

  data.data.venueAnalysis.topVenues.map((item) => {
    stats.value.totalVenueRevenue += item.totalRevenue;
  });

  data.data.eventAnalysis.topEvents.map((item) => {
    stats.value.totalEventRevenue += item.totalRevenue;
  });

  const { data: data2 } = await Feedback.list({});
  stats.value.totalFeedbacks = data2.data.total;

  onlineUserNum.value = await $fetch("/api/getusernum");

  time1 = await $fetch("/api/getstarttime");
}

async function initCharts() {
  if (salesChart.value && ordersChart.value) {
    // 提取销售数据
    const salesData = analysisData?.productAnalysis.topProducts.map(product => product.totalRevenue);
    const salesCategories = analysisData?.productAnalysis.topProducts.map(product => product.productName);

    // 提取订单数据
    const ordersData = analysisData?.eventAnalysis.topEvents.map(event => event.registrationCount);
    const ordersCategories = analysisData?.eventAnalysis.topEvents.map(event => event.eventName);

    // 初始化销售图表
    const salesChartInstance = echarts.init(salesChart.value);
    salesChartInstance.setOption({
      xAxis: {
        type: "category",
        data: salesCategories,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: salesData,
          type: "bar",
          itemStyle: {
            color: '#3b82f6', // 蓝色
          },
        },
      ],
    });

    // 初始化订单图表
    const ordersChartInstance = echarts.init(ordersChart.value);
    ordersChartInstance.setOption({
      xAxis: {
        type: "category",
        data: ordersCategories,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: ordersData,
          type: "bar",
          itemStyle: {
            color: '#10b981', // 绿色
          },
        },
      ],
    });
  }
}
</script>