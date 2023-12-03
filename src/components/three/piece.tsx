import React, { useEffect } from "react";
import { Euler, Vector3 } from "three";
import { useGLTF } from "@react-three/drei";

interface PieceProps {
  position: Vector3 | [number, number, number];
  rotation?: Euler | [number, number, number];
  path: string;
  scale?: number;
}

const Piece = ({
  position,
  rotation,
  path,
  scale,
}: PieceProps): JSX.Element => {
  const { scene } = useGLTF(path);

  useEffect(() => {
    useGLTF.preload(path);
  }, [path]);

  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};

export default Piece;
