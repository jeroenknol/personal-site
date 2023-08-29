uniform vec3 uColorA;
uniform vec3 uColorB;

varying float vZ;
varying vec3 vColor;

void main() {
  // vec3 color = mix(uColorA, uColorB, vZ * 2.0 + 0.5); 
  // gl_FragColor = vec4(color, 1.0);
  gl_FragColor = vec4(vColor, 1.0);
}
