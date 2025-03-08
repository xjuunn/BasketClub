<template>
    <div ref="canvasContainer" class="canvas-container"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import anime from 'animejs';
  
  const canvasContainer = ref(null);
  
  onMounted(() => {
    // 场景
    const scene = new THREE.Scene();
  
    // 相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 200); // 调整相机位置
  
    // 渲染器（设置背景为透明）
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // 启用透明背景
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainer.value.appendChild(renderer.domElement);
  
    // 添加轨道控制器（用于拖拽旋转）
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 启用阻尼效果，使旋转更平滑
    controls.dampingFactor = 0.05; // 阻尼系数
    controls.autoRotate = false; // 禁用自动旋转（由模型自旋转代替）
    controls.minDistance = 50; // 限制相机最近距离
    controls.maxDistance = 500; // 限制相机最远距离
    controls.enablePan = false; // 禁用平移
    controls.enableZoom = false; // 禁用缩放
  
    // 移除旋转限制（允许无限旋转）
    controls.minPolarAngle = 0; // 允许旋转到正上方
    controls.maxPolarAngle = Math.PI; // 允许旋转到正下方
  
    // 加载 GLB 文件
    const loader = new GLTFLoader();
    let model; // 用于存储加载的模型
    loader.load('/basket.glb', (gltf) => {
      model = gltf.scene;
  
      // 将模型居中
      const box = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      box.getCenter(center);
      model.position.sub(center); // 将模型中心移动到原点
  
      // 将模型添加到场景
      scene.add(model);
  
      // 初始化动画：模型从远处飞入
      model.position.z = -200; // 初始位置在远处
      model.scale.set(0.1, 0.1, 0.1); // 初始缩放
  
      // 使用 animejs 实现飞入动画
      anime({
        targets: model.position,
        z: 0, // 移动到中心
        duration: 2000, // 动画持续时间（毫秒）
        easing: 'easeOutExpo', // 缓动效果
      });
      anime({
        targets: model.scale,
        x: 1.3, // 最终缩放为 1.3
        y: 1.3,
        z: 1.3,
        duration: 2000,
        easing: 'easeOutExpo',
      });
    });
  
    // 光照
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
  
    // 随机生成 2 到 6 个光源
    const lightCount = Math.floor(Math.random() * 5) + 2; // 2 到 6 个光源
    const lights = []; // 存储光源对象
  
    for (let i = 0; i < lightCount; i++) {
      const color = new THREE.Color(Math.random(), Math.random(), Math.random()); // 随机颜色
      const light = new THREE.DirectionalLight(color, 1); // 创建光源
      light.position.set(
        (Math.random() - 0.5) * 20, // X 轴随机位置
        (Math.random() - 0.5) * 20, // Y 轴随机位置
        (Math.random() - 0.5) * 20 // Z 轴随机位置
      );
      light.target.position.set(0, 0, 0); // 光源目标位置
      scene.add(light);
      scene.add(light.target);
      lights.push({
        light,
        speed: Math.random() * 0.0005 + 0.0002, // 随机速度（减慢旋转速度）
        direction: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize(), // 随机方向
      });
    }
  
    // 监听拖动事件
    controls.addEventListener('start', () => {
      controls.autoRotate = false; // 用户拖动时停止自动旋转
    });
  
    controls.addEventListener('end', () => {
      controls.autoRotate = false; // 用户停止拖动后不恢复自动旋转
    });
  
    // 自旋转速度
    const rotationSpeed = 0.005; // 旋转速度（弧度/帧）
  
    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
  
      // 更新模型自旋转
      if (model) {
        model.rotation.y += rotationSpeed; // 绕 Y 轴旋转
      }
  
      // 更新光源旋转
      const time = Date.now() * 0.001; // 当前时间（秒）
      lights.forEach((lightData) => {
        const { light, speed, direction } = lightData;
        light.position.add(
          direction.clone().multiplyScalar(Math.sin(time * speed) * 0.1)
        );
      });
  
      // 更新轨道控制器
      controls.update();
  
      // 渲染场景
      renderer.render(scene, camera);
    };
    animate();
  
    // 窗口大小调整时更新渲染器和相机
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
  
      // 更新相机宽高比
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
  
      // 更新渲染器尺寸
      renderer.setSize(width, height);
    };
  
    window.addEventListener('resize', onWindowResize);
  });
  </script>
  
  <style>
  /* 确保容器占据整个视口 */
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden; /* 防止滚动条 */
  }
  
  .canvas-container {
    width: 100%;
    height: 100vh;
    background: transparent; /* 确保容器背景透明 */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>