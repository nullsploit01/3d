uniform vec3 uLightColor;
uniform vec3 uLightPosition;

varying vec3 vNormal;
varying vec3 vPosition;

#include ./includes/pointLight.glsl

void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewPosition = normalize(vPosition - cameraPosition);
    vec3 color = uLightColor;

    vec3 light = vec3(0.0);


    light += pointLight(
                vec3(1.0, 1.0, 1.0), 
                1.0, 
                normal, 
                uLightPosition,
                viewPosition,
                20.0,
                vPosition,
                0.25
            ); 

    color *= light;

    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}