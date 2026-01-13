export function clearUniforms(material) {
  material.uniforms.uHovered.value = 0;
  material.uniforms.uSelected.value = 0;
}

export function setHover(material) {
  material.uniforms.uHovered.value = 1;
}

export function setSelected(material) {
  material.uniforms.uSelected.value = 1;
}
// export function toggleSelected(material) {
//   material.uniforms.uSelected.value = material.uniforms.uSelected.value ? 0 : 1;
// }