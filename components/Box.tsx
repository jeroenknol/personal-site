import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

export const Box = () => {
  const boxRef = useRef<Mesh>(null);
  const randomX = Math.random();
  const randomY = Math.random();
  const randomZ = Math.random();

  useFrame((state) => {
    const clock = state.clock.getElapsedTime();

    if (boxRef && boxRef.current) {
      boxRef.current.rotation.x = clock * randomX * 0.9;
      boxRef.current.rotation.y = clock * randomY * 0.7;
      boxRef.current.rotation.z = clock * randomZ * 0.55;
    }
  });

  return (
    <mesh ref={boxRef}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
};
