"use client";

import React, { useEffect, useRef } from "react";

interface Props {
  className?: string;
  count?: number;
}

export default function ParticleSphereAnimation({ className, count = 900 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const points = Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let angle = 0;
    const render = () => {
      angle += 0.0025;
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.42;
      const tilt = 0.35;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      for (const p of points) {
        const x = p.x * cosA - p.z * sinA;
        const z = p.x * sinA + p.z * cosA;
        const y = p.y * Math.cos(tilt) - z * Math.sin(tilt);
        const zz = p.y * Math.sin(tilt) + z * Math.cos(tilt);

        const depth = (zz + 1) / 2;
        const scale = 0.55 + depth * 0.45;
        const px = cx + x * radius * scale;
        const py = cy + y * radius * scale;
        const size = 0.5 + depth * 1.4;

        ctx.globalAlpha = 0.12 + depth * 0.75;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
