import { useMemo, useRef } from 'react';
import { Color, Mesh, ShaderMaterial, Uniform } from 'three';

// import { fragmentShader } from './fragmentShader';
import fragmentShader from './fragment.glsl';
import vertexShader from './vertex.glsl';
import { useFrame } from '@react-three/fiber';

export const Flag = () => {
  const mesh = useRef<Mesh>(null);
  const shaderMaterialRef = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uColorA: { value: new Color('#FFE486') },
      uColorB: { value: new Color('#FEB3D9') },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;

    if (shaderMaterialRef && shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={shaderMaterialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        // wireframe
      />
    </mesh>
  );
};
