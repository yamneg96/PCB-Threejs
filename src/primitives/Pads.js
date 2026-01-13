import * as THREE from "three";
import { LAYERS } from "../engine/Layers";

export function createPads(pads, material) {
  const geometry = new THREE.BoxGeometry(1, 0.01, 1);
  const mesh = new THREE.InstancedMesh(
    geometry,
    material,
    pads.length
  );

  const matrix = new THREE.Matrix4();
  mesh.userData.idMap = [];

  pads.forEach((pad, i) => {
    matrix.compose(
      new THREE.Vector3(
        pad.pos[0],
        LAYERS[pad.layer.toUpperCase()],
        pad.pos[2]
      ),
      new THREE.Quaternion(),
      new THREE.Vector3(pad.size[0], 1, pad.size[1])
    );
    mesh.setMatrixAt(i, matrix);
    mesh.userData.idMap[i] = pad.id;
  });

  return mesh;
}
