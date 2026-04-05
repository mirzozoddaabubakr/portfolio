"use client"

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextWall } from './text-wall';

gsap.registerPlugin(ScrollTrigger);

export default function Scene3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // ✨ 1. SETUP LOADING MANAGER 🦾🤖✨
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progress = (itemsLoaded / itemsTotal) * 100;
      window.dispatchEvent(new CustomEvent('3d-progress', { detail: progress }));
    };

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.000001; // Offset to avoid shader double precision warnings
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 8);

    const heroModel = new THREE.Group();
    scene.add(heroModel);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // ✨ 1. IMMEDIATE MURAL RENDER (Zero-Wait) 🦾🤖✨
    const textWall = new TextWall(scene);
    
    // We start the GSAP engine immediately to drive the Mural,
    // independent of the heavy 3D assets.
    initGSAP(heroModel);

    // ✨ 2. ASYNC HDR HYDRATION (82MB EXR -> 1.4MB HDR) 🦾🤖✨
    const rgbeLoader = new RGBELoader(loadingManager);
    rgbeLoader.load('/studio.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;

      // ✨ 3. ASYNC HELMET HYDRATION 🦾🤖✨
      const gltfLoader = new GLTFLoader(loadingManager);
      gltfLoader.load('/model.glb', (gltf) => {
        const obj = gltf.scene;
        const box = new THREE.Box3().setFromObject(obj);
        const center = box.getCenter(new THREE.Vector3());
        obj.position.sub(center);
        
        const size = box.getSize(new THREE.Vector3()).length();
        const baseDesiredSize = 4.5;
        obj.scale.setScalar(baseDesiredSize / size);
        
        if (window.innerWidth < 768) {
          heroModel.scale.setScalar(2.8 / 4.5);
        }

        obj.traverse((child: any) => {
          if (child.isMesh && child.material) {
            child.material.envMapIntensity = 1.2;
            child.material.needsUpdate = true;
          }
        });

        heroModel.add(obj);

        // Professional Fade-in once model is ready
        gsap.fromTo(obj.scale, 
          { x: 0, y: 0, z: 0 }, 
          { x: obj.scale.x, y: obj.scale.y, z: obj.scale.z, duration: 1.2, ease: "power3.out" }
        );
      });
    });

    function initGSAP(model: THREE.Group) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#scroll-space",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        }
      });

      // 🌀 PRO MAX CINEMATOGRAPHY (7 PHASES) 🌀
      // Duration scale matches page.tsx (7 phases * 3 duration units = 21 Total)
      
      tl.to(model.rotation, { y: 0.8, x: 0.1, duration: 3 }, 0)        // Phase 0: Intro (Profile Look)
        .to(model.rotation, { y: 0, x: 0, duration: 3 }, 3)            // Phase 1: Genesis (Center Look)
        .to(model.rotation, { y: -0.6, x: -0.2, z: 0.1, duration: 3 }, 6) // Phase 2: Research (Side)
        .to(model.rotation, { y: 0.6, x: -0.3, z: -0.1, duration: 3 }, 9) // Phase 3: Stack (Other Side)
        .to(model.rotation, { x: 0.8, y: 0, z: 0, duration: 3 }, 12)       // Phase 4: Works (Top Look)
        .to(model.rotation, { x: -0.6, y: -0.4, duration: 3 }, 15)      // Phase 5: Global (Bottom Look)
        .to(model.rotation, { x: 0, y: 0, z: 0, duration: 3 }, 18);     // Phase 6: Initiate (Final Face-on)

      // 🌀 SYNC MURAL PROGRESS (7 Phases) 🌀
      tl.to({ p: 0 }, { 
          p: 1, 
          duration: 21,
          onUpdate: function() {
              const p = (this as any).targets()[0].p;
              (scene as any)._muralProgress = p;
          }
      }, 0);
    }

    let curX = 0, targetX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      const p = (scene as any)._muralProgress || 0;
      
      curX += (targetX - curX) * 0.04; 
      
      const swayAmount = 0.12; 
      const driftX = Math.sin(t * 0.4) * swayAmount;
      const driftY = Math.cos(t * 0.7) * (swayAmount * 0.5);
      
      const isMobile = window.innerWidth < 768;
      const baseDriftY = isMobile ? 1.8 : 0;
      const baseDriftX = 0; 
      
      heroModel.position.x = baseDriftX + driftX * (isMobile ? 0.3 : 1);
      heroModel.position.y = baseDriftY + driftY;
      
      // Mouse Parallax + Subtle Scroll Yaw
      // Adding progress-based Yaw (making it feel like it's turning as we move)
      const scrollYaw = Math.sin(p * Math.PI * 4) * 0.2;
      heroModel.rotation.y += (curX * 0.1 + scrollYaw - heroModel.rotation.y) * 0.05;
      
      textWall.update(t, p);
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      heroModel.scale.setScalar(w < 768 ? (2.8 / 4.5) : 1);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
      textWall.destroy();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full z-0 pointer-events-none" 
      id="main-3d-canvas"
    />
  );
}
