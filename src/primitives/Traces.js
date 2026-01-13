import * as THREE from "three";

export function createTrace(data, material) {
  const { points, width } = data;
  const p1 = new THREE.Vector2(points[0][0], points[0][1]);
  const p2 = new THREE.Vector2(points[1][0], points[1][1]);
  
  const distance = p1.distanceTo(p2);
  const geometry = new THREE.PlaneGeometry(width, distance);
  const mesh = new THREE.Mesh(geometry, material);

  // Position and rotate to fit between two points
  const midPoint = new THREE.Vector2().addVectors(p1, p2).multiplyScalar(0.5);
  mesh.position.set(midPoint.x, 0.021, midPoint.y);
  mesh.rotation.x = -Math.PI / 2;
  mesh.rotation.z = Math.atan2(p2.y - p1.y, p2.x - p1.x) - Math.PI / 2;

  return mesh;
}