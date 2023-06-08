#version 300 es

precision highp float;

in float v_time;
in vec4 v_position;
in vec3 v_color;

out vec4 outColor;

void main() {
//   outColor = vec4(mod(v_test + v_position.x * 10.0, 1.0), mod(v_test * 1.6, 1.0), mod(v_test * 0.4, 1.0), 1.0);
//   outColor = vec4(
//     ((v_position.x) + 1.0) / 4.0 + 0.5 * (sin(v_test) + 1.0) / 2.0, 
//     ((v_position.y) + 1.0) / 2.0 * (sin(v_test * 1.6) + 1.0) / 2.0, 
//     (abs(v_position.x + v_position.y) + 1.0) / 2.0 * (sin(v_test * 0.6) + 1.0) / 2.0, 
//     1.0);
    outColor = vec4(mod(v_color + v_position.xyz + v_time / 3.0, 1.0), 1.0);
}