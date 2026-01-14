let hoveredInstance = null;

export function clearHover(material) {
  material.uniforms.uHovered.value = -1;
}

export function setHover(material, instanceId) {
  hoveredInstance = instanceId;
  material.uniforms.uHovered.value = instanceId;
}

export function setSelected(material, instanceId) {
  material.uniforms.uSelected.value = instanceId;
}

export function clearSelected(material) {
  material.uniforms.uSelected.value = -1;
}
