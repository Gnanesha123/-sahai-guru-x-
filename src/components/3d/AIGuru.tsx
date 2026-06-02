import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GuruSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.8}
    >
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#FF6B00"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#FF6B00"
          emissiveIntensity={0.15}
        />
      </Sphere>
      {/* Inner glow sphere */}
      <Sphere args={[0.3, 32, 32]} position={[0.5, 0.5, 0.5]}>
        <meshBasicMaterial color="#FF8C38" transparent opacity={0.6} />
      </Sphere>
      {/* Orbiting particles */}
      {[...Array(8)].map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 8) * Math.PI * 2) * 2.2,
            Math.sin((i / 8) * Math.PI * 2) * 2.2,
            0,
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#FF6B00" transparent opacity={0.6} />
        </mesh>
      ))}
    </Float>
  );
}

function FloatingParticles() {
  const count = 30;
  const particlesRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position;
      const time = clock.getElapsedTime();
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions.array[i3 + 1] += Math.sin(time + i) * 0.001;
      }
      positions.needsUpdate = true;
    }
  });

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#FF6B00"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export function AIGuruScene() {
  return (
    <div className="w-full h-96 md:h-[500px] relative">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FF8C38" />
        <GuruSphere />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}

export function AIGuruMini() {
  return (
    <div className="w-16 h-16 relative">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 30 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <Sphere args={[0.5, 32, 32]}>
            <MeshDistortMaterial
              color="#FF6B00"
              distort={0.2}
              speed={2}
              roughness={0.2}
              metalness={0.8}
              emissive="#FF6B00"
              emissiveIntensity={0.2}
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}
