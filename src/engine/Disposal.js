export function disposeObject(object) {
  object.traverse(child => {
    if (child.geometry) child.geometry.dispose();
    if (child.material) {
      Array.isArray(child.material)
        ? child.material.forEach(m => m.dispose())
        : child.material.dispose();
    }
  });
}
