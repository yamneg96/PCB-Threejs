varying float vInstanceId;

void main() {
  vInstanceId = float(gl_InstanceID);
  vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
