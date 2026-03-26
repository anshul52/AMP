"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

type WebGLSupport = "checking" | "supported" | "unsupported";

function canUseWebGL() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  if (!window.WebGLRenderingContext && !window.WebGL2RenderingContext) {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    const options = {
      alpha: true,
      antialias: false,
      failIfMajorPerformanceCaveat: true,
    };

    return Boolean(
      canvas.getContext("webgl2", options) ||
      canvas.getContext("webgl", options) ||
      canvas.getContext("experimental-webgl", options)
    );
  } catch {
    return false;
  }
}

function GlobeFallback() {
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden rounded-full"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, rgba(247, 89, 28, 0.18), transparent 42%), radial-gradient(circle at 70% 70%, rgba(247, 89, 28, 0.14), transparent 35%), radial-gradient(circle, rgba(247, 89, 28, 0.08) 0%, rgba(247, 89, 28, 0.04) 45%, rgba(247, 89, 28, 0) 72%)",
      }}
    >
      <div
        className="absolute inset-[9%] rounded-full border"
        style={{ borderColor: "rgba(247, 89, 28, 0.18)" }}
      />
      <div
        className="absolute inset-[18%] rounded-full border"
        style={{ borderColor: "rgba(247, 89, 28, 0.12)" }}
      />
      <div
        className="absolute left-1/2 top-[9%] h-[82%] w-[30%] -translate-x-1/2 rounded-full border"
        style={{ borderColor: "rgba(247, 89, 28, 0.12)" }}
      />
      <div
        className="absolute left-1/2 top-[9%] h-[82%] w-[58%] -translate-x-1/2 rounded-full border"
        style={{ borderColor: "rgba(247, 89, 28, 0.08)" }}
      />
      <div
        className="absolute left-[9%] top-1/2 h-[28%] w-[82%] -translate-y-1/2 rounded-full border"
        style={{ borderColor: "rgba(247, 89, 28, 0.12)" }}
      />
      <div
        className="absolute left-[9%] top-1/2 h-[54%] w-[82%] -translate-y-1/2 rounded-full border"
        style={{ borderColor: "rgba(247, 89, 28, 0.08)" }}
      />
    </div>
  );
}

function GlobePoints() {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pts: number[] = [];
    const count = 3000;
    for (let i = 0; i < count; i++) {
      const theta = Math.acos(1 - (2 * i) / count);
      const phi = Math.PI * (1 + Math.sqrt(5)) * i;
      pts.push(
        Math.sin(theta) * Math.cos(phi),
        Math.cos(theta),
        Math.sin(theta) * Math.sin(phi)
      );
    }
    return new Float32Array(pts);
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#f7591c" size={0.015} sizeAttenuation depthWrite={false} opacity={0.7} />
    </Points>
  );
}

function RingLines() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x += delta * 0.03;
    }
  });

  const ringMeshes = useMemo(() => {
    const angles = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4];
    return angles.map((angle) => {
      const pts: THREE.Vector3[] = [];
      for (let i = 0; i <= 64; i++) {
        const a = (i / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a), Math.sin(a) * Math.sin(angle), Math.sin(a) * Math.cos(angle)));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(pts);
      const material = new THREE.LineBasicMaterial({ color: "#f7591c", opacity: 0.15, transparent: true });
      return new THREE.Line(geometry, material);
    });
  }, []);

  return (
    <group ref={groupRef}>
      {ringMeshes.map((mesh, i) => (
        <primitive key={i} object={mesh} />
      ))}
    </group>
  );
}

export default function GlobeScene() {
  const [support, setSupport] = useState<WebGLSupport>("checking");

  useEffect(() => {
    let cancelled = false;
    const frameId = window.requestAnimationFrame(() => {
      if (!cancelled) {
        setSupport(canUseWebGL() ? "supported" : "unsupported");
      }
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  if (support !== "supported") {
    return <GlobeFallback />;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 2.5], fov: 45 }}
      fallback={<GlobeFallback />}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <GlobePoints />
      <RingLines />
    </Canvas>
  );
}
