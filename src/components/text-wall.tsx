import * as THREE from 'three'
import { Text } from 'troika-three-text'

// ✨ 6 NEON SIGNS — UNIFIED TYPOGRAPHY ✨
const FONT_URL = 'https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6rjFMXNX70_aNcZA.woff';

const NEON_SIGNS = [
  { text: "FULL-STACK\nDEVELOPER",    color: 0x00ffff, size: 3.5, font: FONT_URL },
  { text: "FREELANCE\nENGINEER",       color: 0xff00ff, size: 4.0, font: FONT_URL },
  { text: "THE\nCORE STACK",           color: 0x99ff33, size: 3.5, font: FONT_URL },
  { text: "SELECTED\nWORKS",           color: 0x00ffff, size: 3.5, font: FONT_URL },
  { text: "GLOBAL\nNETWORK",          color: 0xff00ff, size: 4.0, font: FONT_URL },
  { text: "CONTACT\nME",               color: 0x99ff33, size: 3.5, font: FONT_URL },
];

export class TextWall {
  group: THREE.Group;
  scene: THREE.Scene;
  mouse: THREE.Vector2;
  signs: any[] = [];
  wall: THREE.Mesh;
  glassPanels: THREE.Mesh[] = [];
  glowLights: THREE.PointLight[] = [];
  dataStream: THREE.Points;
  particles: THREE.Points;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.z = -35; 
    this.mouse = new THREE.Vector2(0, 0);
    
    // 🧱 1. PREMIUM MECHANICAL TECH WALL 🧱
    const loader = new THREE.TextureLoader();
    const techTexture = loader.load('/tech_wall.webp');
    techTexture.wrapS = techTexture.wrapT = THREE.RepeatWrapping;
    techTexture.repeat.set(4, 2.5);
    
    const wallGeometry = new THREE.PlaneGeometry(150, 100, 1, 1);
    const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        map: techTexture,
        roughness: 0.3,
        metalness: 0.6,
        emissive: 0x00ffff,
        emissiveIntensity: 0.02
    });

    this.wall = new THREE.Mesh(wallGeometry, wallMaterial);
    this.group.add(this.wall);

    // 🕸️ 2. DATA STREAM LAYER 🕸️
    this.dataStream = this.createDataStream();
    this.group.add(this.dataStream);

    // ✨ 3. DUST PARTICLES ✨
    this.particles = this.createParticles();
    this.group.add(this.particles);

    this.initSigns();
    this.bindEvents();
  }

  createDataStream() {
    const count = 2000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const opacities = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 120;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
        opacities[i] = Math.random();
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('opacity', new THREE.BufferAttribute(opacities, 1));
    
    const mat = new THREE.PointsMaterial({
        size: 0.15,
        color: 0x00ffff,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    
    return new THREE.Points(geo, mat);
  }

  createParticles() {
    const count = 800;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 100;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ 
        size: 0.05, 
        color: 0xffffff, 
        transparent: true, 
        opacity: 0.2 
    });
    return new THREE.Points(geo, mat);
  }

  initSigns() {
    NEON_SIGNS.forEach((config, i) => {
        const signGroup = new THREE.Group();
        
        // 💎 GLASS PANELS (Rounded Shape) 💎
        const width = config.text.split('\n').length > 1 ? 18 : 22;
        const height = 10;
        const radius = 1.5;
        
        const shape = new THREE.Shape();
        shape.moveTo(-width/2 + radius, -height/2);
        shape.lineTo(width/2 - radius, -height/2);
        shape.quadraticCurveTo(width/2, -height/2, width/2, -height/2 + radius);
        shape.lineTo(width/2, height/2 - radius);
        shape.quadraticCurveTo(width/2, height/2, width/2 - radius, height/2);
        shape.lineTo(-width/2 + radius, height/2);
        shape.quadraticCurveTo(-width/2, height/2, -width/2, height/2 - radius);
        shape.lineTo(-width/2, -height/2 + radius);
        shape.quadraticCurveTo(-width/2, -height/2, -width/2 + radius, -height/2);

        const glassGeo = new THREE.ShapeGeometry(shape);
        const glassMat = new THREE.MeshPhysicalMaterial({
            transmission: 0.95,
            roughness: 0.15,
            ior: 1.5,
            thickness: 0.5,
            specularIntensity: 1,
            specularColor: 0xffffff,
            transparent: true,
            opacity: 0.2, 
            metalness: 0.1,
            color: 0x111111,
            side: THREE.DoubleSide
        });
        
        const panel = new THREE.Mesh(glassGeo, glassMat);
        panel.position.z = -0.1;
        signGroup.add(panel);
        this.glassPanels.push(panel);

        // Text
        const mesh = new Text();
        mesh.text = config.text;
        mesh.fontSize = config.size;
        mesh.font = config.font;
        mesh.lineHeight = 1.0;
        mesh.anchorX = 'center';
        mesh.anchorY = 'middle';
        mesh.position.z = 0.5;
        
        mesh.material = new THREE.MeshBasicMaterial({
            color: config.color,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
        });

        mesh.color = config.color;
        mesh.opacity = 0;
        mesh.transparent = true;
        
        (mesh as any)._config = config;
        (mesh as any)._isSynced = false;
        mesh.onSync = () => { (mesh as any)._isSynced = true; };
        
        this.signs.push(mesh);
        signGroup.add(mesh);
        mesh.sync();

        // Glow Light
        const light = new THREE.PointLight(config.color, 0, 45);
        light.position.set(0, 0, 4);
        signGroup.add(light);
        this.glowLights.push(light);

        this.group.add(signGroup);
        (signGroup as any).visible = false;
        (mesh as any)._parentGroup = signGroup;
    });
    
    this.scene.add(this.group);
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });
  }

  update(elapsedTime: number, scrollProgress: number) {
    const zoom = THREE.MathUtils.smoothstep(scrollProgress, 0, 1);
    this.group.position.z = THREE.MathUtils.lerp(-35, -12, zoom);

    // Animate Data Streams
    const dataPos = this.dataStream.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < dataPos.length; i += 3) {
        dataPos[i + 1] -= 0.05; 
        if (dataPos[i + 1] < -40) dataPos[i + 1] = 40;
    }
    this.dataStream.geometry.attributes.position.needsUpdate = true;

    // Animate Dust
    this.particles.rotation.y += 0.001;
    this.particles.rotation.x += 0.0005;

    const totalSigns = NEON_SIGNS.length;
    this.signs.forEach((mesh: any, i: number) => {
        if (!mesh._isSynced) return;
        const parentGroup = mesh._parentGroup;

        const segStart = i / totalSigns;
        const segEnd = (i + 1) / totalSigns;
        const innerDuration = segEnd - segStart;
        const fadeInEnd = segStart + innerDuration * 0.2;
        const fadeOutStart = segEnd - innerDuration * 0.2;

        let alpha = 0;
        if (scrollProgress >= segStart && scrollProgress <= segEnd) {
            if (i === 0 && scrollProgress < fadeInEnd) alpha = 1.0;
            else if (scrollProgress < fadeInEnd) alpha = THREE.MathUtils.smoothstep(scrollProgress, segStart, fadeInEnd);
            else if (scrollProgress > fadeOutStart) alpha = 1 - THREE.MathUtils.smoothstep(scrollProgress, fadeOutStart, segEnd);
            else alpha = 1.0;
        }

        mesh.material.opacity = alpha;
        mesh.opacity = alpha;
        parentGroup.visible = alpha > 0.01;
        
        if (this.glassPanels[i]) {
            (this.glassPanels[i].material as THREE.MeshPhysicalMaterial).opacity = alpha * 0.3;
        }

        const scale = 0.9 + alpha * 0.1;
        parentGroup.scale.setScalar(scale);

        if (this.glowLights[i]) {
            this.glowLights[i].intensity = alpha * 8;
        }

        if (alpha > 0.9 && Math.random() > 0.99) {
            mesh.material.opacity = 0.2;
            if (this.glowLights[i]) this.glowLights[i].intensity = 1.0;
        }
    });

    this.group.rotation.y = this.mouse.x * 0.03;
    this.group.rotation.x = -this.mouse.y * 0.03;

    // 🔦 Dynamic Scanning Lights for Wall Depth 🔦
    this.glowLights.forEach((light, i) => {
        const offset = (i / this.glowLights.length) * Math.PI * 2;
        light.position.x = Math.sin(elapsedTime * 0.5 + offset) * 30;
        light.position.y = Math.cos(elapsedTime * 0.3 + offset) * 20;
    });
  }

  destroy() {
    this.scene.remove(this.group);
  }
}
