import { useMemo, useRef } from 'react';
import { Color, DoubleSide, Mesh, ShaderMaterial } from 'three';

import fragmentShader from './fragment.glsl';
import vertexShader from './vertex.glsl';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useTheme } from '../../../providers/Theme.provider';

// new Color('#F3C29E'),
// new Color('#F5D495'),
// new Color('#F0E191'),
// new Color('#FFE486'),
// new Color('#FEB3D9'),
// new Color('#8BDF9C'),
// new Color('#9B8FDB'),

export const Hills = () => {
  const theme = useTheme();
  const isDark = theme === 'dark';
  const mesh = useRef<Mesh>(null);
  const shaderMaterialRef = useRef<ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uColor: {
        value: [
          // new Color('#F3C29E'),
          // new Color('#F5D495'),
          // new Color('#F0E191'),
          new Color(isDark ? '#252f6c' : '#F9FFFF'),
          new Color(isDark ? '#2c3e62' : '#FFF2DD'),
          new Color(isDark ? '#3e3990' : '#FEFFDE'),
        ],
      },
      uIntensity: {
        value: 0.1,
      },
      uRange: {
        value: 1.0,
      },
      uOffset: {
        value: 1.55,
      },
    }),
    []
  );

  const { x, y, z } = useControls('Camera', { x: 0, y: -1.04, z: 0.49 });
  const { color1, color2, color3 } = useControls('Colors', {
    color1: '#F9FFFF',
    color2: '#FFF2DD',
    color3: '#FEFFDE',
  });
  const { intensity, range, offset } = useControls('Misc', {
    intensity: 0.2,
    range: 0.8,
    offset: 2.0,
    // range: 1.0,
    // offset: 1.55,
  });

  useFrame((state) => {
    const { clock, camera } = state;

    camera.position.set(x, y, z);
    if (shaderMaterialRef && shaderMaterialRef.current) {
      shaderMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      shaderMaterialRef.current.uniforms.uIntensity.value = intensity;
      shaderMaterialRef.current.uniforms.uColor.value = [
        new Color(isDark ? '#252f6c' : color1),
        new Color(isDark ? '#2c3e62' : color2),
        new Color(isDark ? '#3e3990' : color3),
      ];
      shaderMaterialRef.current.uniforms.uRange.value = range;
      shaderMaterialRef.current.uniforms.uOffset.value = offset;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <planeGeometry args={[3, 3, 200, 200]} />
      <shaderMaterial
        ref={shaderMaterialRef}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
        side={DoubleSide}
        // wireframe
      />
    </mesh>
  );
};
