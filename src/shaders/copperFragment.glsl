uniform float uHovered;
uniform float uSelected;
varying float vInstanceId;

void main() {
  vec3 copper = vec3(0.72, 0.45, 0.20);

  if (abs(vInstanceId - uHovered) < 0.5) {
    copper += vec3(0.2, 0.2, 0.0);
  }

  if (abs(vInstanceId - uSelected) < 0.5) {
    copper = mix(copper, vec3(1.0, 0.9, 0.4), 0.6);
  }

  gl_FragColor = vec4(copper, 1.0);
}
