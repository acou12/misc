#version 300 es

precision highp float;

in float v_time;
in vec2 v_position;
in vec3 v_color;

out vec4 outColor;

void main() {
    float size = v_time / 5.0;
    vec3 color1 = vec3(181.0, 136.0, 99.0) / 256.0;
    vec3 color2 = vec3(240.0, 217.0, 181.0) / 256.0;
    float parity = mod(floor(v_position.x * size) + floor(v_position.y * size), 2.0);
    vec3 color = color1 * parity + color2 * (1.0 - parity);
    outColor = vec4(
        color,
    1.0);
}