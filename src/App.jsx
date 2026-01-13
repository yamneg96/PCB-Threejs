import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Engine } from "./engine/Engine";
import { createBoard } from "./engine/Board";
import { createPads } from "./primitives/Pads";
import { createTrace } from "./primitives/Traces";
import { copperVertex } from "./shaders/copperVertex";
import { copperFragment } from "./shaders/copperFragment";
import MenuBar from "./ui/MenuBar";
import Sidebar from "./ui/Sidebar";

export default function App() {
  const mountRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const engine = new Engine(mountRef.current);
    const board = createBoard({ width: 100, height: 80, thickness: 1.6 });
    engine.scene.add(board);

    const copperMat = new THREE.ShaderMaterial({
      vertexShader: copperVertex,
      fragmentShader: copperFragment,
      uniforms: { uHovered: { value: 0 }, uSelected: { value: 0 } },
      polygonOffset: true, // Z-fighting mitigation
      polygonOffsetFactor: -1
    });

    const pads = createPads([{ id: "pad_1", pos: [10, 0, 5], size: [2, 4] }], copperMat); const trace = createTrace({ points: [[0, 0], [10, 10]], width: 0.5 }, copperMat); engine.scene.add(pads, trace);

    const tControls = new TransformControls(engine.camera, engine.renderer.domElement); engine.scene.add(tControls);

    // Update React Sidebar during transformation
    tControls.addEventListener("change", () => {
      if (tControls.object) {
        setSelected(prev => ({ ...prev, position: tControls.object.position.toArray() }));
      }
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, engine.camera);
      const hits = raycaster.intersectObjects([pads, trace]);

      if (hits.length > 0) {
        const hit = hits[0];
        copperMat.uniforms.uSelected.value = 1.0;
        tControls.attach(hit.object);
        
        const data = hit.instanceId !== undefined ? pads.userData.idMap[hit.instanceId] : { id: "trace_1", area: 5 };
        setSelected({ ...data, position: hit.point.toArray() });
      } else {
        tControls.detach();
        copperMat.uniforms.uSelected.value = 0.0;
        setSelected(null);
      }
    };

    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
      engine.dispose();
    };
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      <MenuBar onToggle={() => setSidebarOpen(true)} />
      <div ref={mountRef} className="flex-grow" />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} selected={selected} />
    </div>
  );
}