import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Engine } from "./engine/Engine";
import { createBoard } from "./engine/Board";
import { createPads } from "./primitives/Pads";
import { createTrace } from "./primitives/Traces";
import { copperVertex } from "./shaders/copperVertex";
import { copperFragment } from "./shaders/copperFragment";
import { PersistenceManager } from "./persistence/manager";
import MenuBar from "./ui/MenuBar";
import Sidebar from "./ui/Sidebar";

export default function App() {
  const mountRef = useRef(null);
  const engineRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // Material reference for Save/Load hydration
  const copperMatRef = useRef(null);

  useEffect(() => {
    const engine = new Engine(mountRef.current);
    engineRef.current = engine;

    // 1. Create Substrate
    const board = createBoard({ width: 100, height: 80, thickness: 1.6 });
    engine.scene.add(board);

    // 2. Initialize Copper Material with interaction uniforms
    const copperMat = new THREE.ShaderMaterial({
      vertexShader: copperVertex,
      fragmentShader: copperFragment,
      uniforms: { 
        uHovered: { value: 0 }, 
        uSelected: { value: 0 } 
      },
      polygonOffset: true, 
      polygonOffsetFactor: -1,
      transparent: true
    });
    copperMatRef.current = copperMat;

    // 3. Add initial components and flag them as exportable for the Editor
    const initialPads = [
      { id: "pad_1", pos: [10, 0, 5], size: [2, 4] },
      { id: "pad_2", pos: [-10, 0, -5], size: [3, 3] }
    ];
    const pads = createPads(initialPads, copperMat);
    pads.userData.exportable = true;
    pads.userData.type = "smd_rect";

    const trace = createTrace({ points: [[0, 0], [10, 10]], width: 0.5 }, copperMat);
    trace.userData.exportable = true;
    trace.userData.type = "path";
    trace.userData.id = "trace_1";

    engine.scene.add(pads, trace);

    // 4. Transform Controls (Restricted to XZ plane)
    const tControls = new TransformControls(engine.camera, engine.renderer.domElement);
    tControls.showY = false; // Restricted as per PDF
    engine.scene.add(tControls);

    tControls.addEventListener("dragging-changed", (event) => {
      engine.controls.enabled = !event.value;
    });

    tControls.addEventListener("change", () => {
      if (tControls.object) {
        setSelected(prev => ({ 
          ...prev, 
          position: tControls.object.position.toArray() 
        }));
      }
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onClick = (e) => {
      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, engine.camera);
      // We check all exportable objects added to scene
      const interactable = engine.scene.children.filter(obj => obj.userData.exportable);
      const hits = raycaster.intersectObjects(interactable, true);

      if (hits.length > 0) {
        const hit = hits[0];
        const object = hit.object;

        // Interaction Shader Feedback
        copperMat.uniforms.uSelected.value = 1.0;
        
        // Editor Gizmo
        tControls.attach(object);
        setSidebarOpen(true);

        // Sidebar Data Sync
        const data = object.instanceId !== undefined 
          ? object.userData.idMap[hit.instanceId] 
          : { id: object.userData.id || "trace_1", area: 5 };

        setSelected({ 
          ...data, 
          position: object.position.toArray() 
        });
      } else {
        if (!tControls.dragging) {
          tControls.detach();
          copperMat.uniforms.uSelected.value = 0.0;
          setSelected(null);
        }
      }
    };

    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("mousedown", onClick);
      engine.dispose();
    };
  }, []);

  // Editor Save/Load Handlers
  const handleSave = () => {
    PersistenceManager.serialize(engineRef.current.scene);
  };

  const handleLoad = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        PersistenceManager.hydrate(event.target.result, engineRef.current.scene, copperMatRef.current);
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-black">
      <MenuBar 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
        onSave={handleSave} 
        onLoad={handleLoad} 
      />
      <div ref={mountRef} className="flex-grow" />
      <Sidebar 
        open={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        selected={selected} 
      />
    </div>
  );
}