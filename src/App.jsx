import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Engine } from "./engine/Engine";
import { createBoard } from "./engine/Board";
import { copperVertex } from "./shaders/copperVertex";
import { copperFragment } from "./shaders/copperFragment";
import { createPads } from "./primitives/Pads";

export default function App() {
  const mountRef = useRef(null);

  useEffect(() => {
    const engine = new Engine(mountRef.current);

    engine.scene.add(
      createBoard({ width: 100, height: 80, thickness: 1.6 })
    );

    const material = new THREE.ShaderMaterial({
      vertexShader: copperVertex,
      fragmentShader: copperFragment,
      uniforms: {
        uHovered: { value: 0 },
        uSelected: { value: 0 }
      }
    });

    const pads = createPads(
      [
        {
          id: "pad_1",
          pos: [10, 0, 10],
          size: [2, 4],
          layer: "top"
        }
      ],
      material
    );

    engine.scene.add(pads);

    return () => engine.dispose();
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}
