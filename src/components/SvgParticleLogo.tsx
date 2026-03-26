"use client";

import React, { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
};

type SvgParticleLogoProps = {
  svgSrc: string;
  height?: number;
  bgColor?: string;
  particleColor?: string;
  particleGap?: number;
  particleSize?: number;
  repelRadius?: number;
  returnStrength?: number;
  damping?: number;
  logoScale?: number;
  logoOffsetX?: number;
  logoOffsetY?: number;
  className?: string;
};

export default function SvgParticleLogo({
  svgSrc,
  height = 760,
  bgColor = "transparent",
  particleColor = "#f7591c",
  particleGap = 3,
  particleSize = 1.4,
  repelRadius = 140,
  returnStrength = 0.035,
  damping = 0.88,
  logoScale = 0.9,
  logoOffsetX = 0.5,
  logoOffsetY = 0.5,
  className = "",
}: SvgParticleLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
    };

    let dpr = 1;

    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loadImage = (src: string) =>
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Failed to load ${src}`));
        img.src = src;
      });

    const buildParticles = async () => {
      particlesRef.current = [];

      const img = await loadImage(svgSrc);
      const rect = canvas.getBoundingClientRect();
      const viewW = Math.floor(rect.width);
      const viewH = Math.floor(rect.height);

      const off = document.createElement("canvas");
      off.width = viewW;
      off.height = viewH;
      const offCtx = off.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.clearRect(0, 0, viewW, viewH);

      const imgAspect = img.width / img.height;
      const maxW = viewW * logoScale;
      const maxH = viewH * 0.82;

      let drawW = maxW;
      let drawH = drawW / imgAspect;

      if (drawH > maxH) {
        drawH = maxH;
        drawW = drawH * imgAspect;
      }

      const x = viewW * logoOffsetX - drawW / 2;
      const y = viewH * logoOffsetY - drawH / 2;

      offCtx.drawImage(img, x, y, drawW, drawH);

      const data = offCtx.getImageData(0, 0, viewW, viewH).data;

      for (let py = 0; py < viewH; py += particleGap) {
        for (let px = 0; px < viewW; px += particleGap) {
          const i = (py * viewW + px) * 4;
          const alpha = data[i + 3];

          if (alpha > 80) {
            particlesRef.current.push({
              x: px,
              y: py,
              baseX: px,
              baseY: py,
              vx: 0,
              vy: 0,
              size: particleSize,
            });
          }
        }
      }
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const viewW = rect.width;
      const viewH = rect.height;

      ctx.clearRect(0, 0, viewW, viewH);

      if (bgColor !== "transparent") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, viewW, viewH);
      }

      ctx.fillStyle = particleColor;

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < repelRadius && dist > 0.001) {
            const force = 1 - dist / repelRadius;
            const dirX = dx / dist;
            const dirY = dy / dist;

            p.vx += dirX * force * 6;
            p.vy += dirY * force * 6;
          }
        }

        p.vx += (p.baseX - p.x) * returnStrength;
        p.vy += (p.baseY - p.y) * returnStrength;

        p.vx *= damping;
        p.vy *= damping;

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      animationRef.current = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const init = async () => {
      setCanvasSize();
      await buildParticles();
      render();
    };

    const handleResize = async () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      setCanvasSize();
      await buildParticles();
      render();
    };

    init();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [
    svgSrc,
    bgColor,
    particleColor,
    particleGap,
    particleSize,
    repelRadius,
    returnStrength,
    damping,
    logoScale,
    logoOffsetX,
    logoOffsetY,
  ]);

  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        minHeight: `${height}px`,
        overflow: "visible",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}