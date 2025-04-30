
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface EarthModelProps {
  size?: number;
  className?: string;
}

const Earth = ({ size = 1 }: { size?: number }) => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = clock.getElapsedTime() * 0.12;
    }
  });
  
  return (
    <group>
      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhongMaterial 
          color="#2233ff"
          emissive="#57cbff"
          emissiveIntensity={0.2}
          roughness={1}
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh>
        <sphereGeometry args={[size + 0.05, 32, 32]} />
        <meshBasicMaterial 
          color="#5eeeff" 
          transparent={true} 
          opacity={0.1} 
        />
      </mesh>
      
      {/* Clouds */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[size + 0.02, 32, 32]} />
        <meshPhongMaterial 
          color="#ffffff" 
          transparent={true} 
          opacity={0.4} 
        />
      </mesh>
    </group>
  );
};

const EarthModel = ({ size = 1, className = "" }: EarthModelProps) => {
  return (
    <div className={`h-40 w-40 ${className}`}>
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Earth size={size} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default EarthModel;
