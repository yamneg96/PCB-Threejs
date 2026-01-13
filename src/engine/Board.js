import * as THREE from "three";

export function createBoard({ width, height, thickness }) {
  const geometry = new THREE.BoxGeometry(width, thickness, height);

  const material = new THREE.MeshStandardMaterial({
    color: 0x2e7d32,
    roughness: 0.9,
    metalness: 0.05
  });

  const board = new THREE.Mesh(geometry, material);
  board.position.y = 0;

  return board;
}
