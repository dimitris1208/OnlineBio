"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

export default function ParticlesCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* απαλό gradient πίσω από τα particles */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(59,130,246,0.25),rgba(0,0,0,0))]" />
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
        camera={{ position: [0, 0, 1.4], fov: 55 }}
      >
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      </Canvas>
      {/* mask ώστε να «σβήνουν» κορυφή/βάση */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/60" />
    </div>
  );
}

function Particles() {
  const ref = useRef<THREE.Points | null>(null);

  const positions = useMemo(() => {
    const count = 750;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 4.6;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 2.7;
      arr[i * 3 + 2] = Math.random() * -2.2;
    }
    return arr;
  }, []);

  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.035 + mouse.x * 0.08;
    ref.current.rotation.x = Math.sin(t * 0.18) * 0.02 - mouse.y * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial size={0.01} transparent opacity={0.5} depthWrite={false} />
    </Points>
  );
}
