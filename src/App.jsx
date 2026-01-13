import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { Engine } from "./engine/Engine";
import { createBoard } from "./engine/Board";
import { createPads } from "./primitives/Pads";
import { createEdges } from "./primitives/Edges";

import { copperVertex } from "./shaders/copperVertex";
import { copperFragment } from "./shaders/copperFragment";

import { updateMouse, raycast } from "./interaction/Raycast";
import { clearUniforms, setHover, setSelected } from "./interaction/Selection";
import { attachTransform } from "./interaction/Transform";

import MenuBar from "./ui/MenuBar";
import Sidebar from "./ui/Sidebar";

export default function App() {
  const mountRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelectedState] = useState(null);

  useEffect(() => {
    const engine = new Engine(mountRef.current);

    const boardConfig = { width: 100, height: 80, thickness: 1.6 };
    engine.scene.add(createBoard(boardConfig));

    const material = new THREE.ShaderMaterial({
      vertexShader: copperVertex,
      fragmentShader: copperFragment,
      uniforms: {
        uHovered: { value: 0 },
        uSelected: { value: 0 }
      }
    });

    const padsData = [
      { id: "pad_1", pos: [10, 0, 10], size: [2, 4], layer: "top", type: "smd_rect" }
    ];

    const pads = createPads(padsData, material);
    engine.scene.add(pads);

    const edges = createEdges(pads.geometry);
    edges.position.y += 0.03;
    pads.add(edges);

    // engine.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    // engine.scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

    let transformControls = null;

    const onMouseMove = e => {
      updateMouse(e);
      clearUniforms(material);

      const hits = raycast(engine.camera, [pads]);
      if (hits.length) setHover(material);
    };

    const onClick = e => {
      updateMouse(e);
      const hits = raycast(engine.camera, [pads]);
      if (!hits.length) return;

      setSelected(material);
      const hit = hits[0];

      setSelectedState({
        id: pads.userData.idMap[hit.instanceId],
        position: hit.point.toArray()
      });

      if (transformControls) engine.scene.remove(transformControls);
      transformControls = attachTransform(
        engine.camera,
        engine.renderer.domElement,
        pads,
        () => {}
      );
      engine.scene.add(transformControls);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      engine.dispose();
      console.log(engine.renderer.info.memory);
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <MenuBar onToggle={() => setSidebarOpen(true)} />
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        selected={selected}
      />
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
};