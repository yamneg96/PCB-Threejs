import * as THREE from 'three';

export function createPads(data, material) {
  const geometry = new THREE.PlaneGeometry(1, 1);
  const mesh = new THREE.InstancedMesh(geometry, material, data.length);
  const dummy = new THREE.Object3D();
  const idMap = {};

  const BOARD_TOP = 1.6 / 2;

  data.forEach((pad, i) => {
    dummy.position.set(
      pad.pos[0],
      BOARD_TOP + 0.02,
      pad.pos[2]
    );
    dummy.scale.set(pad.size[0], pad.size[1], 1);
    dummy.rotation.x = -Math.PI / 2;
    dummy.updateMatrix();

    mesh.setMatrixAt(i, dummy.matrix);
    idMap[i] = { id: pad.id, area: pad.size[0] * pad.size[1] };
  });

  mesh.userData.idMap = idMap;
  mesh.instanceMatrix.needsUpdate = true;

  return mesh;
}
