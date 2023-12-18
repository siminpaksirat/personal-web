attribute float aRandom;

uniform vec2 uFrequency;
uniform float uTime;

varying float vElevation;
varying vec2 vUv;
varying float vRandom;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 8.0;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 3.0;
    elevation += cos(modelPosition.x * uFrequency.x - uTime);

    modelPosition.z += elevation;




    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;



    vUv = uv;
    vElevation = elevation;

}
