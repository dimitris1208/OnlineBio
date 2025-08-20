"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";




export default function ParticlesCanvas() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 1.25]}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
        camera={{ position: [0, 0, 1.3], fov: 60 }}
      >
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Particles() {
  const ref = useRef<THREE.Points | null>(null);

  // σταθερές, ελαφριές θέσεις
  const positions = useMemo(() => {
    const count = 800;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 4.5;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 2.8;
      arr[i * 3 + 2] = Math.random() * -2.2;
    }
    return arr;
  }, []);

  // συνεχόμενη αργή περιστροφή + parallax από mouse
  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();

    // base slow rotation
    ref.current.rotation.y = t * 0.04; // πιο αργά/γρήγορα: άλλαξε τον συντελεστή
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.02;

    // subtle parallax από το mouse (προστίθεται πάνω στη βάση)
    ref.current.rotation.y += mouse.x * 0.08;
    ref.current.rotation.x += -mouse.y * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial size={0.012} transparent opacity={0.55} depthWrite={false} />
    </Points>
  );
}
