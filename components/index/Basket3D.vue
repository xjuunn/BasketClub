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
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 200);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainer.value.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false;
    controls.minDistance = 50;
    controls.maxDistance = 500;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minPolarAngle = 0; 
    controls.maxPolarAngle = Math.PI;
    const loader = new GLTFLoader();
    let model;
    loader.load('/basket.glb', (gltf) => {
      model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = new THREE.Vector3();
      box.getCenter(center);
      model.position.sub(center);
      scene.add(model);
      model.position.z = -200;
      model.scale.set(0.1, 0.1, 0.1);    
      anime({
        targets: model.position,
        z: 0,
        duration: 2000,
        easing: 'easeOutExpo'
      });
      anime({
        targets: model.scale,
        x: 1.3,
        y: 1.3,
        z: 1.3,
        duration: 2000,
        easing: 'easeOutExpo',
      });
    });
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const lightCount = Math.floor(Math.random() * 5) + 2;
    const lights = [];
  
    for (let i = 0; i < lightCount; i++) {
      const color = new THREE.Color(Math.random(), Math.random(), Math.random()); // 随机颜色
      const light = new THREE.DirectionalLight(color, 1);
      light.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      light.target.position.set(0, 0, 0);
      scene.add(light);
      scene.add(light.target);
      lights.push({
        light,
        speed: Math.random() * 0.0005 + 0.0002, 
        direction: new THREE.Vector3(
          Math.random() - 0.5,
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize(),
      });
    }
    controls.addEventListener('start', () => {
      controls.autoRotate = false;
    });
  
    controls.addEventListener('end', () => {
      controls.autoRotate = false;
    });

    const rotationSpeed = 0.005;
    const animate = () => {
      requestAnimationFrame(animate);
      if (model) {
        model.rotation.y += rotationSpeed; 
      }
      const time = Date.now() * 0.001;
      lights.forEach((lightData) => {
        const { light, speed, direction } = lightData;
        light.position.add(
          direction.clone().multiplyScalar(Math.sin(time * speed) * 0.1)
        );
      });
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  
    const onWindowResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
  
    window.addEventListener('resize', onWindowResize);
  });
  </script>
  
  <style>
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  
  .canvas-container {
    width: 100%;
    height: 100%;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>