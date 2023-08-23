import { Canvas } from '@react-three/fiber';
import { Box } from './Box';

export const CanvasElement = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color='red' position={[0, 0, 5]} />

      <Box />
    </Canvas>
  );
};
