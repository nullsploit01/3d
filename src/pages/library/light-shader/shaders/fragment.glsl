uniform vec3 uLightColor;
uniform vec3 uLightPosition;
uniform vec3 uObjectColor;
uniform float uLightIntensity;

varying vec3 vNormal;
varying vec3 vPosition;

#include ./includes/pointLight.glsl

void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewPosition = normalize(vPosition - cameraPosition);
    vec3 lightColor = uLightColor;
    vec3 objectColor = uObjectColor;

    vec3 light = vec3(0.0);


    light += pointLight(
                lightColor, 
                uLightIntensity, 
                normal, 
                uLightPosition,
                viewPosition,
                20.0,
                vPosition,
                0.25
            ); 

    objectColor *= light;

    gl_FragColor = vec4(objectColor, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}