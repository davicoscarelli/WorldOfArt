import React, { Suspense, useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import Controls from "components/three/controls";
import Gallery from "components/three/gallery";
import Piece from "components/three/piece";
import Painting from "components/three/painting";
import Graffiti from "components/three/graffiti";
import paintingsData from "components/three/paintings_data.json"; // Adjust the path as needed

import { Loader as CanvasLoader, Preload } from "@react-three/drei";
import { Mesh } from "three";

const IndexPage = (): JSX.Element => {
  const [floor, setFloor] = useState<Mesh>();
  const [audio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState("");

  const songs = [
    {
      path: "/songs/guaruja.mp3",
      title: "Guarujá",
      artist: "Koosha Azim",
    },
    {
      path: "/songs/departed_love.mp3",
      title: "Departed Love",
      artist: "Koosha Azim",
    },
    {
      path: "/songs/quarantine_lofi.mp3",
      title: "Quarantine Lofi",
      artist: "Davi Coscarelli",
    },
    {
      path: "/songs/neo_seoul.mp3",
      title: "Neo Seoul",
      artist: "Koosha Azim",
    },
    {
      path: "/songs/azur.mp3",
      title: "Azur",
      artist: "Sadri Dridi",
    },
    {
      path: "/songs/brume.mp3",
      title: "Brume",
      artist: "Sadri Dridi",
    },
    {
      path: "/songs/lueur.mp3",
      title: "Lueur",
      artist: "Sadri Dridi",
    },
    {
      path: "/songs/nostalgie.mp3",
      title: "Nostalgie",
      artist: "Sadri Dridi",
    },
    {
      path: "/songs/reverie.mp3",
      title: "Reverie",
      artist: "Sadri Dridi",
    },
  ];

  const playMusic = useCallback(() => {
    if (!isPlaying) {
      const randomSong = songs[Math.floor(Math.random() * songs.length)];
      audio.src = randomSong.path;
      audio.play().catch((e) => console.error("Error playing audio:", e));
      setIsPlaying(true);
      setCurrentSong(`${randomSong.title} by ${randomSong.artist}`);
    }
  }, [audio, isPlaying, songs]);

  const pauseMusic = useCallback(() => {
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [audio, isPlaying]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        pauseMusic();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pauseMusic]);

  const onCanvasCreated = useCallback(
    ({ gl }) => {
      gl.domElement.addEventListener("click", playMusic);
      return () => gl.domElement.removeEventListener("click", playMusic);
    },
    [playMusic]
  );

  return (
    <>
      <Canvas onCreated={onCanvasCreated}>
        <ambientLight />
        <Suspense fallback={null}>
          <Controls floor={floor} />

          <Graffiti
            imagePath={`paintings/minerva.png`}
            position={[-31, 1.7, 5.7]}
            rotation={[0, 3.14159, 0]}
          />

          {paintingsData.map((painting, index) => (
            <Painting
              key={index}
              name={painting.path}
              position={painting.position}
              rotation={painting.rotation}
              scale={1.5}
              title={painting.title}
              artist={painting.artist}
            />
          ))}
          <Gallery setFloor={setFloor} />
          <Piece
            path={"/honk/scene.gltf"}
            position={[4.5, -1.48, 0]}
            rotation={[0, -2, 0]}
            scale={2.2}
          />

          <Piece
            path={"/vending/scene.gltf"}
            position={[8.55, 0.7, 11]}
            rotation={[0, 3.14159, 0]}
            scale={2.2}
          />
          <Piece
            path={"/k_box/scene.gltf"}
            position={[9.55, -0.3, 13]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={0.4}
          />
          <Piece
            path={"/k_box2/scene.gltf"}
            position={[8.9, 0.85, 12.55]}
            rotation={[0, 2, 0]}
            scale={0.025}
          />
          <Piece
            path={"/newspaper/scene.gltf"}
            position={[8.2, 0.85, 12.93]}
            rotation={[0, -2.3, 0]}
            scale={0.004}
          />

          <Piece
            path={"/trash/scene.gltf"}
            position={[-25.67, -1.4, 11]}
            rotation={[0, 3.14159, 0]}
            scale={0.03}
          />

          <Piece
            path={"/table/scene.gltf"}
            position={[-25.25, -0.72, 13.7]}
            rotation={[0, -3, 0]}
            scale={1.5}
          />
          <Piece
            path={"/cash/scene.gltf"}
            position={[-25.25, -0.2, 14.5]}
            rotation={[0, 2, 0]}
            scale={2.4}
          />
          <Piece
            path={"/mate/scene.gltf"}
            position={[-25.6, -0.1, 13.2]}
            rotation={[0, 0, 0]}
            scale={0.02}
          />
          <Piece
            path={"/bag/scene.gltf"}
            position={[-24.8, 0, 12.9]}
            rotation={[1.5, 0, 1]}
            scale={0.15}
          />

          <Piece
            path={"/lantern/scene.gltf"}
            position={[-25.5, -3.5, -4]}
            rotation={[0, Math.PI / 2, 0]}
            scale={30}
          />

          <Preload all />
        </Suspense>
      </Canvas>
      <CanvasLoader
        barStyles={{ height: "10px" }}
        dataStyles={{ fontSize: "14px" }}
        dataInterpolation={(percent) =>
          `Loading Exhibition ${percent.toFixed(0)}%`
        }
      />
      {isPlaying && (
        <div
          style={{
            position: "absolute",
            right: "10px",
            bottom: "10px",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Now Playing: {currentSong}
        </div>
      )}
    </>
  );
};

export default IndexPage;
