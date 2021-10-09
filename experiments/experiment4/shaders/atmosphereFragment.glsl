
varying vec3 vertexNormal;

void main() {
    float intensity = pow(0.8 - dot(vertexNormal, vec3(0, 0,2.5)), 2.0);

    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
}