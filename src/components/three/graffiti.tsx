// Graffiti.tsx
import React, { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import { MeshBasicMaterial, PlaneGeometry, sRGBEncoding } from "three";

const Graffiti = ({ imagePath, position, rotation }) => {
  const scale = 7;
  const texture = useTexture(imagePath);
  texture.encoding = sRGBEncoding;

  const aspectRatio = useMemo(() => {
    return texture.image ? texture.image.width / texture.image.height : 1;
  }, [texture]);

  const geometry = useMemo(
    () => new PlaneGeometry(aspectRatio * scale, 1 * scale),
    [aspectRatio, scale]
  );
  const material = new MeshBasicMaterial({
    map: texture,
    transparent: true,
  });

  return (
    <mesh position={position} rotation={rotation} args={[geometry, material]} />
  );
};

export default Graffiti;
