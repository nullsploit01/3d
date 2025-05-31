uniform float uTime;
varying vec2 vUv;

void main() {
    vec3 brown = vec3(0.36, 0.25, 0.20);
    gl_FragColor = vec4(brown, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}