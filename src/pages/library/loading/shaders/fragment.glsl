uniform float uTime;
varying vec2 vUv;

void main() {
    gl_FragColor = vec4(0.65, 0.75, 0.1, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}