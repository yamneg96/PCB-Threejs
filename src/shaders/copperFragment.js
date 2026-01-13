export const copperFragment = `
uniform float uHovered;
uniform float uSelected;

void main() {
  vec3 copper = vec3(0.72, 0.45, 0.2);

  if (uHovered > 0.5) {
    copper += vec3(0.2, 0.2, 0.0);
  }

  if (uSelected > 0.5) {
    copper += vec3(0.3, 0.1, 0.0);
  }

  gl_FragColor = vec4(copper, 1.0);
}
`;
