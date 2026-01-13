export const copperVertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Support for InstancedMesh [cite: 16, 62]
    vec4 instancePosition = instanceMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * instancePosition;
  }
`;