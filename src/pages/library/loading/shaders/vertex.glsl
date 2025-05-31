uniform float uTime;

varying vec2 vUv;

// float rand(vec2 co) {
//   return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
// }

// mat2 getRotationMatrix(float angle) {
//   float s = sin(angle);
//   float c = cos(angle);
//   return mat2(c, -s, s, c);
// }


// void main() {
//     vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//     vec4 viewPosition = viewMatrix * modelPosition;
//     gl_Position = projectionMatrix * viewPosition;

//     vUv = uv;
// }


float rand(vec2 co) {
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
    vUv = uv;

    float breakAmount = smoothstep(0.3, 1.0, abs(sin(uTime * 0.4)));

    // Each vertex has a random fall offset
    float dropSpeed = rand(uv * 10.0 + uTime) * 2.0;

    vec3 displaced = position;

    // Simulate particles falling when "broken"
    displaced.y -= dropSpeed * breakAmount;


    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}