uniform float uTime;

varying vec2 vUv;

float rand(vec2 co) {
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main()
{
    vUv = uv;

    float cycle = abs(sin(uTime * 0.5));
    float displacement = rand(uv) * cycle * 1.0;
    vec3 newPosition = position + normal * cycle;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
}