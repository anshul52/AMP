"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

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
  return (
    <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }} style={{ background: "transparent" }}>
      <ambientLight intensity={0.5} />
      <GlobePoints />
      <RingLines />
    </Canvas>
  );
}
