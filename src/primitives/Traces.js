import * as THREE from "three";

export function createTrace(data, material) {
  const { points, width } = data;
  const p1 = new THREE.Vector3(points[0][0], 0.021, points[0][1]);
  const p2 = new THREE.Vector3(points[1][0], 0.021, points[1][1]);
  
  const distance = p1.distanceTo(p2);
  const geometry = new THREE.PlaneGeometry(width, distance);
  const mesh = new THREE.Mesh(geometry, material);

  // Requirement: Manifold geometry (not simple lines) [cite: 18]
  mesh.position.copy(p1.clone().add(p2).multiplyScalar(0.5));
  mesh.rotation.x = -Math.PI / 2;
  mesh.rotation.z = Math.atan2(p2.x - p1.x, p2.z - p1.z);

  return mesh;
}