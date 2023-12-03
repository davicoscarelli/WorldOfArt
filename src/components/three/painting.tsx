import { useTexture, Text } from "@react-three/drei";
import React, { useMemo } from "react";
import {
  MeshBasicMaterial,
  PlaneGeometry,
  sRGBEncoding,
  Vector3,
  Euler,
} from "three";

interface PaintingProps {
  name: string;
  position: Vector3 | [number, number, number];
  rotation?: Euler | [number, number, number];
  scale?: number;
  title: string;
  artist: string;
}

const Painting = ({
  name = "",
  position,
  rotation = [0, 0, 0],
  scale = 1,
  title,
  artist,
}: PaintingProps): JSX.Element => {
  const texture = useTexture(`paintings/${name}`);
  texture.encoding = sRGBEncoding;

  // Calculate the aspect ratio of the texture
  const aspectRatio = useMemo(() => {
    return texture.image ? texture.image.width / texture.image.height : 1;
  }, [texture]);

  // Create geometry based on the texture's aspect ratio and scale
  const geometry = useMemo(
    () => new PlaneGeometry(aspectRatio * scale, 1 * scale),
    [aspectRatio, scale]
  );
  const material = new MeshBasicMaterial({
    map: texture,
  });

  // Adjust frame size and position based on scale
  const frameThickness = 0.05 * scale;
  const frameSize = [
    aspectRatio * scale + frameThickness,
    1 * scale + frameThickness,
    0.1 * scale,
  ];
  const frameOffset = 0.06 * scale;
  let framePosition = [position[0], position[1], position[2] - frameOffset];

  // Adjust frame position for flipped paintings
  if (rotation[1] === 3.14159) {
    framePosition = [position[0], position[1], position[2] + frameOffset];
  }

  const textPosition = useMemo(() => {
    return [position[0], position[1] - 1, position[2]];
  }, [position, scale]);

  return (
    <>
      <mesh
        position={position}
        rotation={rotation}
        args={[geometry, material]}
      />
      <mesh position={framePosition} rotation={rotation}>
        <boxGeometry args={frameSize} />
        <meshStandardMaterial color="Black" />
      </mesh>
      <Text
        position={textPosition}
        rotation={rotation}
        fontSize={0.05 * scale} // Adjust font size as needed
        color="black" // Text color
        anchorX="center" // Center the text horizontally
        anchorY="top" // Align the top of the text with the position
      >
        {`${title} - ${artist}`}
      </Text>
    </>
  );
};
export default Painting;
