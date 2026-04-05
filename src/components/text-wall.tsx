import * as THREE from 'three'
import { Text } from 'troika-three-text'

// ✨ 6 NEON SIGNS — ONE PER SCROLL PAGE — "WRITTEN ON THE WALL" ✨
const NEON_SIGNS = [
  { text: "SYSTEM\nKINETIK",       color: 0x00ffff, size: 4.0, font: 'https://fonts.gstatic.com/s/fredokaone/v13/v0z7df9P_VAdCnS376A2_H9L-92R.woff' },  // Phase 1
  { text: "RESEARCH\nREVOLUTION",  color: 0xff00ff, size: 4.5, font: 'https://fonts.gstatic.com/s/luckiestguy/v15/_v7pSd_q6NBy9idpT_z_T7m3N0f6.woff' },  // Phase 2
  { text: "THE\nCORE STACK",       color: 0x99ff33, size: 4.0, font: 'https://fonts.gstatic.com/s/fredokaone/v13/v0z7df9P_VAdCnS376A2_H9L-92R.woff' },  // Phase 3
  { text: "SELECTED\nWORKS",       color: 0x00ffff, size: 4.0, font: 'https://fonts.gstatic.com/s/luckiestguy/v15/_v7pSd_q6NBy9idpT_z_T7m3N0f6.woff' },  // Phase 4
  { text: "GLOBALLY\nSCALED",      color: 0xff00ff, size: 4.5, font: 'https://fonts.gstatic.com/s/fredokaone/v13/v0z7df9P_VAdCnS376A2_H9L-92R.woff' },  // Phase 5
  { text: "INITIATE\nPROJECT",     color: 0x99ff33, size: 4.0, font: 'https://fonts.gstatic.com/s/luckiestguy/v15/_v7pSd_q6NBy9idpT_z_T7m3N0f6.woff' },  // Phase 6
];

export class TextWall {
  group: THREE.Group;
  scene: THREE.Scene;
  mouse: THREE.Vector2;
  signs: any[] = [];
  wall: THREE.Mesh;
  glowLights: THREE.PointLight[] = [];

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.z = -35; // Slightly closer to feel 'written on wall'
    this.mouse = new THREE.Vector2(0, 0);
    
    // 🧱 DARKEST MONOCHROMATIC NIGHT BRICK WALL 🧱
    const loader = new THREE.TextureLoader();
    const brickGeometry = new THREE.PlaneGeometry(120, 80, 1, 1);

    const brickTexture = loader.load('/realistic_brick_texture.webp');
    brickTexture.wrapS = brickTexture.wrapT = THREE.RepeatWrapping;
    brickTexture.repeat.set(4, 2.5); 
    
    // Performance Tweak: Lower anisotropy for speed, especially on mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    brickTexture.anisotropy = isMobile ? 2 : 4;
    brickTexture.colorSpace = THREE.SRGBColorSpace;

    const brickMaterial = new THREE.MeshStandardMaterial({
        map: brickTexture,
        color: 0x1a1a1a,      
        roughness: 1.0,       // Max roughness = less specular calculation
        metalness: 0.0,
    });

    this.wall = new THREE.Mesh(brickGeometry, brickMaterial);
    this.group.add(this.wall);

    this.initSigns();
    this.bindEvents();
  }

  initSigns() {
    NEON_SIGNS.forEach((config, i) => {
        const mesh = new Text();
        mesh.text = config.text;
        mesh.fontSize = config.size;
        mesh.font = config.font;
        mesh.lineHeight = 1.0;
        mesh.anchorX = 'center';
        mesh.anchorY = 'middle';
        mesh.position.y = 0;
        mesh.position.z = 0.5;
        
        // Emissive basic material for self-glow
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
        
        this.signs.push(mesh);
        this.group.add(mesh);
        mesh.sync();

        // High intensity localized light for the neon glow
        const light = new THREE.PointLight(config.color, 0, 45);
        light.position.set(0, 0, 4);
        this.group.add(light);
        this.glowLights.push(light);
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
    // 🌀 1. WALL ZOOM — pushes toward camera on scroll 🌀
    const zoom = THREE.MathUtils.smoothstep(scrollProgress, 0, 1);
    this.group.position.z = THREE.MathUtils.lerp(-35, -12, zoom);

    // 🌀 2. SEQUENTIAL 6-PHASE TEXT REVEAL 🌀
    const totalSigns = NEON_SIGNS.length;

    this.signs.forEach((mesh: any, i: number) => {
        const segStart = i / totalSigns;
        const segEnd = (i + 1) / totalSigns;
        const segMid = (segStart + segEnd) / 2;

        let alpha = 0;
        if (scrollProgress >= segStart && scrollProgress <= segEnd) {
            // Stay fully visible for a plateau in the middle
            const innerDuration = segEnd - segStart;
            const fadeInEnd = segStart + innerDuration * 0.2;
            const fadeOutStart = segEnd - innerDuration * 0.2;

            if (scrollProgress < fadeInEnd) {
                alpha = THREE.MathUtils.smoothstep(scrollProgress, segStart, fadeInEnd);
            } else if (scrollProgress > fadeOutStart) {
                alpha = 1 - THREE.MathUtils.smoothstep(scrollProgress, fadeOutStart, segEnd);
            } else {
                alpha = 1.0;
            }
        }

        // Apply
        mesh.material.opacity = alpha;
        mesh.opacity = alpha;
        mesh.visible = alpha > 0.01;

        // Scale pop effect
        const scale = 0.9 + alpha * 0.1;
        mesh.scale.setScalar(scale);

        // Glow light intensity
        if (this.glowLights[i]) {
            this.glowLights[i].intensity = alpha * 9;
        }

        // Neon flicker
        if (alpha > 0.9 && Math.random() > 0.995) {
            mesh.material.opacity = 0.3;
            if (this.glowLights[i]) this.glowLights[i].intensity = 1.5;
        }
    });

    // Subtle parallax from mouse
    this.group.rotation.y = this.mouse.x * 0.02;
    this.group.rotation.x = -this.mouse.y * 0.02;
  }

  destroy() {
    this.scene.remove(this.group);
  }
}
