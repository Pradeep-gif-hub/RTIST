import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Layers, RotateCcw, Cpu } from 'lucide-react';

// Geometric 3D Robotic Combat / RC Chassis Assembly
function RobotModel({ wireframe }: { wireframe: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const logoTexture = useLoader(THREE.TextureLoader, '/logo.png');

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: '#64748B',
    roughness: 0.38,
    metalness: 0.65,
    wireframe: wireframe,
  });

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: '#FF5500',
    emissive: '#FF5500',
    emissiveIntensity: 0.35,
    roughness: 0.2,
    metalness: 0.9,
    wireframe: wireframe,
  });

  const cyanMaterial = new THREE.MeshStandardMaterial({
    color: '#00E5FF',
    emissive: '#00E5FF',
    emissiveIntensity: 0.4,
    roughness: 0.1,
    metalness: 0.8,
    wireframe: wireframe,
  });

  const wheelMaterial = new THREE.MeshStandardMaterial({
    color: '#334155',
    roughness: 0.72,
    metalness: 0.28,
    wireframe: wireframe,
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Lower Main Chassis Plate */}
      <mesh position={[0, 0, 0]} material={bodyMaterial}>
        <boxGeometry args={[3.2, 0.2, 2.0]} />
      </mesh>

      {/* Top Deck Carbon Bridge */}
      <mesh position={[0, 0.4, 0]} material={bodyMaterial}>
        <boxGeometry args={[2.4, 0.1, 1.4]} />
      </mesh>

      {/* Center Electronics Enclosure */}
      <mesh position={[0, 0.6, 0]} material={accentMaterial}>
        <boxGeometry args={[1.2, 0.3, 0.8]} />
      </mesh>

      <mesh position={[0.606, 0.6, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.42, 0.3]} />
        <meshBasicMaterial map={logoTexture} toneMapped={false} wireframe={wireframe} />
      </mesh>

      {/* Front Wedge Blade (Robo Sumo / RC Bumper) */}
      <mesh position={[1.8, 0, 0]} rotation={[0, 0, -Math.PI / 6]} material={accentMaterial}>
        <boxGeometry args={[0.8, 0.15, 2.2]} />
      </mesh>

      {/* Standoff Pillars */}
      {[[-0.9, -0.5], [-0.9, 0.5], [0.9, -0.5], [0.9, 0.5]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.2, z]} material={cyanMaterial}>
          <cylinderGeometry args={[0.06, 0.06, 0.4, 8]} />
        </mesh>
      ))}

      {/* 4 Heavy-Duty Wheels / Hubs */}
      {[
        [-1.1, -0.15, -1.2],
        [1.1, -0.15, -1.2],
        [-1.1, -0.15, 1.2],
        [1.1, -0.15, 1.2],
      ].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={wheelMaterial}>
            <cylinderGeometry args={[0.55, 0.55, 0.35, 24]} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={cyanMaterial}>
            <cylinderGeometry args={[0.25, 0.25, 0.37, 16]} />
          </mesh>
        </group>
      ))}

      {/* Top Sensor Tower (LiDAR / Camera) */}
      <mesh position={[0.2, 0.85, 0]} material={cyanMaterial}>
        <cylinderGeometry args={[0.25, 0.25, 0.2, 16]} />
      </mesh>

      {/* Status LED Beacon */}
      <mesh position={[-0.8, 0.5, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial color="#00FF66" />
      </mesh>
    </group>
  );
}

// 2D Static Blueprint Fallback for low-spec / reduced motion / no-WebGL
function FallbackBlueprint() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-rtist-surface/40 border border-rtist-border relative overflow-hidden">
      <div className="absolute inset-0 bg-blueprint-grid opacity-30" />
      <div className="relative z-10 text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-full bg-rtist-accent/10 border border-rtist-accent flex items-center justify-center text-rtist-accent animate-pulse">
          <Cpu className="w-8 h-8" />
        </div>
        <div className="font-mono text-xs text-rtist-accent tracking-widest uppercase">
          [ CAD_SCHEMATIC // APEX-MK4 ]
        </div>
        <div className="text-sm font-medium text-white">
          Interactive 3D Engine Ready
        </div>
        <div className="text-xs text-rtist-textMuted max-w-xs">
          Carbon fiber double-deck chassis, 4-wheel planetary drive, 120A sensorless powertrain.
        </div>
      </div>
    </div>
  );
}

export const RobotViewer: React.FC = () => {
  const [wireframe, setWireframe] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
    }
  }, []);

  if (!hasWebGL || prefersReducedMotion) {
    return <FallbackBlueprint />;
  }

  return (
    <div className="relative w-full h-[360px] sm:h-[440px] md:h-[480px] bg-rtist-surface/40 border border-rtist-border group overflow-hidden">
      {/* Technical Blueprint Overlay Lines */}
      <div className="absolute inset-0 bg-tech-grid-bg opacity-30 pointer-events-none" />
      
      {/* Corner HUD markers */}
      <div className="absolute top-3 left-3 text-[10px] font-mono text-rtist-textMuted flex items-center gap-1.5 z-10">
        <span className="w-2 h-2 rounded-full bg-rtist-green animate-ping shrink-0" />
        <span>3D_VIEWPORT // ACTIVE</span>
      </div>

      <div className="absolute bottom-3 left-3 text-[10px] font-mono text-rtist-textMuted z-10 hidden sm:block">
        ROTATE: [DRAG] &nbsp;|&nbsp; ZOOM: [SCROLL]
      </div>

      {/* Control Buttons */}
      <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
        <button
          onClick={() => setWireframe(!wireframe)}
          className={`px-2.5 py-1 text-[11px] font-mono border transition-colors flex items-center gap-1.5 ${
            wireframe
              ? 'bg-rtist-accent text-white border-rtist-accent shadow-[0_0_12px_#FF5500]'
              : 'bg-rtist-card text-rtist-textMuted border-rtist-border hover:text-white hover:border-rtist-accent/50'
          }`}
          title="Toggle Wireframe Mode"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{wireframe ? 'WIREFRAME: ON' : 'WIREFRAME'}</span>
        </button>
      </div>

      {/* 3D Canvas */}
      <Suspense fallback={<FallbackBlueprint />}>
        <Canvas
          camera={{ position: [4, 3, 4], fov: 45 }}
          className="cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-4, -2, -4]} intensity={1.2} color="#00E5FF" />
          <pointLight position={[3, 2, 4]} intensity={1.5} color="#FF5500" />
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <RobotModel wireframe={wireframe} />
          </Float>

          <OrbitControls
            enableZoom={true}
            minDistance={3}
            maxDistance={8}
            enablePan={false}
            autoRotate={false}
          />
        </Canvas>
      </Suspense>

      {/* Telemetry Footer */}
      <div className="absolute bottom-3 right-3 bg-rtist-card/80 backdrop-blur-sm border border-rtist-border px-2 py-1 text-[10px] font-mono text-rtist-accent flex items-center gap-1">
        <RotateCcw className="w-3 h-3 animate-spin" style={{ animationDuration: '8s' }} />
        <span>SYS_STATUS: 100% ONLINE</span>
      </div>
    </div>
  );
};
