import * as THREE from "three";

export function createBoard({ width, height, thickness }) {
  const geometry = new THREE.BoxGeometry(width, thickness, height);
  const material = new THREE.MeshStandardMaterial({
    color: 0x2e7d32
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = -thickness / 2;
  mesh.receiveShadow = true;

  return mesh;
}
