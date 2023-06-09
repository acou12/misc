#version 300 es

precision highp float;

in float v_time;
in vec2 v_position;
in vec3 v_color;

out vec4 outColor;

void main() {
    float res = 100.0;
    vec2 new_position = v_position;
    new_position.x += sin(v_time) * (mod(floor(v_position.y * res), 2.0) * 2.0 - 1.0);
    float rand = round(fract(sin(dot(floor((new_position.xy) * res) / res,vec2(12.1,78.233)))*(10000.0 + v_time)));
    outColor = vec4(
        vec3(rand),
    1.0);
}