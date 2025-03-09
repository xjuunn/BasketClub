<template>
  <div
    class="relative w-full z-40 pt-20 pb-20 flex flex-col items-center justify-center"
  >
    <div class="text-center space-y-6 px-4 md:px-0">
      <h1
        class="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent animate-gradient"
      >
        “篮”不住的便捷，“约”得到的随心！
      </h1>
      <p
        class="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto opacity-0 animate-fade-in"
      >
        随时随地查看场地空闲情况，一键预约、取消或修改，告别排队等候。让篮球爱好者“投”其所好，享受无缝衔接的运动体验！
      </p>
    </div>
    <div class="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container mt-20">
      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">智在管理，效在掌控！</h2>
          <p>
            通过在线预约和智能分配功能，减少人工操作，提高场地使用效率。实时数据支持，让决策更高效、更精准，助您轻松“管”住每一寸场地！
          </p>
        </div>
      </div>
      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">篮不住的便捷，约得到的随心！</h2>
          <p>
            随时随地查看场地空闲情况，一键预约、取消或修改，告别排队等候。让篮球爱好者“投”其所好，享受无缝衔接的运动体验！
          </p>
        </div>
      </div>
      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">篮下无闲置，管上无浪费！</h2>
          <p>
            通过智能调度机制，系统确保每一寸场地都能物尽其用，避免资源浪费。让篮球场馆的运营效益最大化，实现“篮”图无限！
          </p>
        </div>
      </div>
      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">篮动未来，数领潮流！</h2>
          <p>
            我们不仅提供场地预约服务，更通过数据分析帮助场馆经营者洞察用户需求，定制个性化服务。用科技赋能体育产业，推动篮球运动蓬勃发展！
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 5s ease infinite;
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1.5s ease forwards;
  animation-delay: 0.5s;
}
</style>
