import * as THREE from "three";

export function createEdges(mesh) {
  const geo = new THREE.EdgesGeometry(mesh.geometry);
  const mat = new THREE.LineBasicMaterial({ color: 0x000000 });
  return new THREE.LineSegments(geo, mat);
}
