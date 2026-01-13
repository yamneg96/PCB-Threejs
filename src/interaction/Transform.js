import { TransformControls } from "three/examples/jsm/controls/TransformControls";

export function attachTransform(camera, dom, target) {
  const controls = new TransformControls(camera, dom);
  controls.attach(target);
  controls.setMode("translate");
  controls.showY = false;
  return controls;
}
