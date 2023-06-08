#version 300 es

in vec4 a_position;
in vec3 a_color;

uniform float u_test;

uniform float u_ratio;

out float v_test;
out vec4 v_position;
out vec3 v_color;

void main() {
  v_test = u_test;

  float rotation = 6.28 * 5.0 * sin(u_test / 20.0);

  gl_Position = a_position;
  gl_Position.xy = vec2(
    gl_Position.x * cos(rotation) + gl_Position.y * -sin(rotation),
    gl_Position.x * sin(rotation) + gl_Position.y *  cos(rotation)
  );
  gl_Position.x /= u_ratio;

  v_position = gl_Position;
  v_color = a_color;
}