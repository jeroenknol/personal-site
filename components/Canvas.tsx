import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import { Hills } from './threejs/Hills';

export const CanvasElement = () => {
  return (
    <Canvas camera={{ position: [0, -0.66, 0.49] }}>
      <ambientLight intensity={0.1} />
      <directionalLight color='red' position={[0, 0, 5]} />

      {/* <Box /> */}
      {/* <Flag /> */}
      <Hills />
      <OrbitControls />

      <color args={['#dfffff']} attach='background' />
    </Canvas>
  );
};
