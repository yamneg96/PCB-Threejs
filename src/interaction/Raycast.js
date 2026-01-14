import * as THREE from "three";

export const raycaster = new THREE.Raycaster();
export const mouse = new THREE.Vector2();

export function updateMouse(event, domElement) {
  const rect = domElement.getBoundingClientRect();

  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

export function raycast(camera, objects) {
  raycaster.setFromCamera(mouse, camera);
  return raycaster.intersectObjects(objects, true);
}
