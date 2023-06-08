#version 300 es

in vec2 a_angle;
in vec3 a_color;

uniform float u_time;
uniform float u_ratio;

out float v_time;
out vec4 v_position;
out vec3 v_color;

void main() {
  float angle = a_angle.x;
  float isOuter = a_angle.y;

  float r = 0.3 + 0.05 * sin(u_time / 5.0) * sin(angle * 12.0);

  angle += u_time / 20.0;
  r += u_time / 100.0;

  gl_Position = isOuter == 1.0
    ? vec4(r * cos(angle), r * sin(angle), 0.0, 1.0)
    : vec4(0.0, 0.0, 0.0, 1.0);
  
  gl_Position.x /= u_ratio;

  v_time = u_time;
  v_position = gl_Position;
  v_color = a_color;
}