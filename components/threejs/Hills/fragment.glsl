uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vColor;

void main() {
  // gl_FragColor = vec4(vUv, 0.5, 1.0);
  gl_FragColor = vec4(vColor, 1.0);
}
