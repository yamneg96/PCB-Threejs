import * as THREE from "three";

export function createPads(padsData, material) {
  const geometry = new THREE.PlaneGeometry(1, 1);
  const mesh = new THREE.InstancedMesh(geometry, material, padsData.length);
  const dummy = new THREE.Object3D();
  const idMap = {};

  padsData.forEach((pad, i) => {
    dummy.position.set(pad.pos[0], 0.02, pad.pos[2]); // Z-spacing [cite: 12]
    dummy.scale.set(pad.size[0], pad.size[1], 1);
    dummy.rotation.x = -Math.PI / 2;
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    idMap[i] = pad.id;
  });

  mesh.userData.idMap = idMap;
  mesh.instanceMatrix.needsUpdate = true;
  return mesh;
}