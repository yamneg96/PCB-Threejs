export const copperFragment = `
  uniform float uHovered;
  uniform float uSelected;
  varying vec2 vUv;

  void main() {
    // Procedural Brushed Copper [cite: 21]
    vec3 baseColor = vec3(0.72, 0.45, 0.20); 
    float brushLines = fract(sin(vUv.x * 120.0) * 43758.5453);
    vec3 color = baseColor * (0.85 + 0.15 * brushLines);

    // Interaction Pulse/Highlight [cite: 24, 65]
    if (uSelected > 0.5) {
      color = mix(color, vec3(1.0, 0.8, 0.2), 0.5); // Golden selection
    } else if (uHovered > 0.5) {
      color += vec3(0.2, 0.2, 0.2); // Hover brightness
    }

    gl_FragColor = vec4(color, 1.0);
  }
`;