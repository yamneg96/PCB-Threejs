import * as THREE from "three";

/**
 * Smoothly frames an object for inspection.
 * Used after selection to support PCB inspection.
 */
export function zoomToObject(camera, controls, object, padding = 1.4) {
  const box = new THREE.Box3().setFromObject(object);

  if (box.isEmpty()) return;

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = THREE.MathUtils.degToRad(camera.fov);
  let distance = maxDim / (2 * Math.tan(fov / 2));
  distance *= padding;

  const direction = camera.position.clone()
    .sub(controls.target)
    .normalize();

  camera.position.copy(center.clone().add(direction.multiplyScalar(distance)));
  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();

  controls.target.copy(center);
  controls.update();
}
