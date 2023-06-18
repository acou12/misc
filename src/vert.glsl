#version 300 es
	 
in vec4 a_position;

uniform vec2 u_position;
uniform float u_rotation;
uniform float u_scale;
uniform float u_aspect;
 
void main() {
  mat2 rotationMatrix = mat2(cos(u_rotation), -sin(u_rotation), sin(u_rotation), cos(u_rotation));
  mat2 scaleMatrix = mat2(u_scale, 0, 0, u_scale);
  vec2 rotated = scaleMatrix * rotationMatrix * a_position.xy;
  vec2 translated = vec2(rotated.x / u_aspect, rotated.y) + vec2(u_position.x / u_aspect, u_position.y);
  translated /= 5.0;
  gl_Position = vec4(translated, 0.0, 1.0);
}