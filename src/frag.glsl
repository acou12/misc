#version 300 es

precision highp float;

in float v_time;
in vec2 v_position;
in vec3 v_color;

out vec4 outColor;

void main() {
    float slices = 20.0;
    float angleSlices = 30.0;
    float dist = distance(vec2(0.0, 0.0), v_position);
    float dispDist = dist - v_time / 5.0;
    float angle = atan(v_position.y, v_position.x);
    float distSnapped = floor(dispDist * slices) / slices;
    float angleSnapped = floor((angle + (dist - 0.5) * v_time) / 6.28318 * angleSlices) * 6.28318 / angleSlices;
    // float distSnapped = dist;
    vec3 color = (sin(vec3(
        distSnapped * 31.4 / 1.6 + v_time + angleSnapped * 3.0 * (mod(distSnapped * slices, 3.0) + 1.0),
        distSnapped * 31.4 / 1.2 + v_time,
        distSnapped * 31.4 / 2.1 + v_time
    )) + 1.0) / 2.0;
    outColor = vec4(
        color,
    1.0);
}