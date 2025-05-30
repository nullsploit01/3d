uniform float uTime;

varying vec2 vUv;

float rand(vec2 co) {
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

mat2 getRotationMatrix(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}


void main() {
    vUv = uv;

    float cycle = abs(sin(uTime * 0.4));

    float rotationSpeed = 1.0 - cycle;
    float angle = uTime * rotationSpeed * 0.5; 

    vec3 newPosition = position + normal * cycle;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

    modelPosition.xz *= getRotationMatrix(angle);

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
}