import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ThemeContext } from "styled-components";

// Define the type for the position prop
interface CubeProps {
  position: [number, number, number];
  onOutOfBounds: () => void;
  dimensions: { x: number; y: number; z: number };
  color: string;
  mouse: any;
}

const Cube: React.FC<CubeProps> = ({
  position,
  onOutOfBounds,
  dimensions,
  color,
  mouse,
}) => {
  const ref = useRef<THREE.Mesh>(null);
  const speed = 0.1;
  const { scene, camera, raycaster } = useThree();
  const [hovered, setHovered] = useState(false);
  const theme = useContext(ThemeContext);
  useFrame(() => {});

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x -= speed;
      if (ref.current.position.x < -100) {
        onOutOfBounds();
      }
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      const isHovered = intersects.some((intersect) => {
        return (
          intersect.object.position.z === position[2] &&
          intersect.object.position.x === ref.current?.position.x &&
          intersect.object.position.y === ref.current?.position.y
        );
      });
      setHovered(isHovered);
    }
  });

  return (
    <mesh
      castShadow
      ref={ref}
      position-x={100}
      position-y={position[1]}
      scale={2}
    >
      <boxGeometry args={[dimensions.x, dimensions.y, dimensions.z]} />
      <meshBasicMaterial
        color={hovered ? theme?.colors.tertiary1Hover : color}
        transparent={true}
        opacity={hovered ? 0.5 : 1}
      />
    </mesh>
  );
};

// Define the type for the cube state
interface CubeState {
  id: number;
  position: [number, number, number];
  dimensions: { x: number; y: number; z: number };
  color: string;
}

const Cubes: React.FC = () => {
  const [cubes, setCubes] = useState<CubeState[]>([]);
  const { gl, mouse } = useThree();
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const bounds = gl.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    },
    [gl.domElement, mouse]
  );
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);
  useEffect(() => {
    const interval = setInterval(() => {
      const rgbValue = Math.floor(gsap.utils.random(100, 250));
      setCubes((cubes) => [
        ...cubes,
        {
          id: Math.random(),
          position: [100, gsap.utils.random(40, -40), 0],
          dimensions: {
            x: gsap.utils.random(1, 20),
            y: gsap.utils.random(1, 20),
            z: gsap.utils.random(1, 10),
          },
          color: `rgb(${rgbValue},${rgbValue},${rgbValue})`,
          isHovered: false,
        },
      ]);
    }, 100); // Change the interval to control cube generation speed

    return () => clearInterval(interval);
  }, []);

  const handleOutOfBounds = (id: number) => {
    setCubes((cubes) => cubes.filter((cube) => cube.id !== id));
  };

  return (
    <>
      {cubes.map((cube) => (
        <Cube
          key={cube.id}
          position={cube.position}
          dimensions={cube.dimensions}
          onOutOfBounds={() => handleOutOfBounds(cube.id)}
          color={cube.color}
          mouse={mouse}
        />
      ))}
    </>
  );
};

const MovingCubes: React.FC = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 50] }}>
      <ambientLight intensity={10} />
      <spotLight
        position={[15, 2, 10]}
        angle={0.3}
        intensity={10}
        penumbra={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-1024}
        shadow-camera-right={1024}
      />
      <Cubes />
    </Canvas>
  );
};

export default MovingCubes;
