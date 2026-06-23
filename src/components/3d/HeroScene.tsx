"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "../ui/ReducedMotion";
import { useMousePosition } from "@/hooks/useMousePosition";

function SceneNodes({ darkMode }: { darkMode: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const mouse = useMousePosition();
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  // Mouse Parallax Logic
  useFrame(() => {
    if (!groupRef.current || prefersReducedMotion) return;
    
    // Normalize mouse coords (-1 to 1)
    const x = (mouse.x / window.innerWidth) * 2 - 1;
    const y = -(mouse.y / window.innerHeight) * 2 + 1;

    // Target positions with 0.05 speed lerp
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x * 2, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y * 2, 0.05);
  });

  // Materials
  const accentMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({  
    color: "#8b5cf6",
    emissive: "#4c1d95",
    emissiveIntensity: 0.5,
    roughness: 0.1,
    metalness: 0.8,
    clearcoat: 1,
    clearcoatRoughness: 0.2,
  }), []);

  const cyanMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({  
    color: "#06b6d4",
    emissive: "#0891b2",
    emissiveIntensity: 0.5,
    roughness: 0.2,
    metalness: 0.5,
    clearcoat: 1,
  }), []);

  const pinkMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({  
    color: "#ec4899",
    emissive: "#be185d",
    emissiveIntensity: 0.5,
    roughness: 0.3,
    metalness: 0.3,
    wireframe: true,
  }), []);

  return (
    <group ref={groupRef}>
      {/* Center Animated Gradient Blob */}
      <Float speed={prefersReducedMotion ? 0 : 2} rotationIntensity={0} floatIntensity={0} position={[0, 0, -5]}>
        <mesh scale={viewport.width / 4}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color={darkMode ? "#1e293b" : "#E6D8C3"}
            emissive={darkMode ? "#0f172a" : "#F5F5F0"}
            distort={prefersReducedMotion ? 0 : 0.4}
            speed={prefersReducedMotion ? 0 : 2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Floating Icosahedron */}
      <Float speed={prefersReducedMotion ? 0 : 1.5} rotationIntensity={prefersReducedMotion ? 0 : 2} floatIntensity={prefersReducedMotion ? 0 : 2} position={[4, 2, -2]}>
        <mesh material={accentMaterial} scale={1.5}>
          <icosahedronGeometry args={[1, 0]} />
        </mesh>
      </Float>

      {/* Floating Torus Knot */}
      <Float speed={prefersReducedMotion ? 0 : 2} rotationIntensity={prefersReducedMotion ? 0 : 2} floatIntensity={prefersReducedMotion ? 0 : 2} position={[-4, -2, -1]}>
        <mesh material={cyanMaterial} scale={0.8}>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        </mesh>
      </Float>

      {/* Floating Wireframe Octahedron */}
      <Float speed={prefersReducedMotion ? 0 : 3} rotationIntensity={prefersReducedMotion ? 0 : 4} floatIntensity={prefersReducedMotion ? 0 : 3} position={[3, -3, 1]}>
        <mesh material={pinkMaterial} scale={1.2}>
          <octahedronGeometry args={[1, 0]} />
        </mesh>
      </Float>
      
      {/* Ambient Lighting & Environment */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#8b5cf6" />
      <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#06b6d4" />
      <Environment preset="city" />
    </group>
  );
}

export function HeroScene({ darkMode }: { darkMode: boolean }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    // Fallback static gradient for reduced motion
    return (
      <div className={`absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${darkMode ? 'from-violet-900/20 via-[#020617] to-[#020617]' : 'from-[#C2A68C]/40 via-[#F5F5F0] to-[#F5F5F0]'} opacity-60`} />
    );
  }

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none ${darkMode ? 'mix-blend-screen opacity-70' : 'mix-blend-normal opacity-90'}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} // Support high-DPI screens but cap at 2 for perf
        gl={{ antialias: false, powerPreference: "high-performance" }} // Optimized GL config
      >
        <SceneNodes darkMode={darkMode} />
      </Canvas>
    </div>
  );
}
