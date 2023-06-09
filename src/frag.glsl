#version 300 es

precision highp float;

in float v_time;
in vec2 v_position;
in vec3 v_color;

out vec4 outColor;

float f(float x) {
    return 3.0 * cos(x / 2.0);
}

void main() {
    vec3 color = vec3(0.0);
    vec2 uv = v_position;
    uv *= 10.0;

    float small_width = 0.03;

    color += 1.0 - step(small_width, fract(uv.x));
    color += 1.0 - step(small_width, fract(uv.y));

    float large_width = 0.05;

    color += 1.0 - step(large_width, abs(uv.x));
    color += 1.0 - step(large_width, abs(uv.y));

    color = clamp(color, 0.0, 1.0);

    float current_x = smoothstep(0.0, 20.0, v_time * 10.0) * 20.0 - 10.0;

    float function = (1.0 - step(0.1, abs(uv.y - f(uv.x)))) * (1.0 - step(current_x, uv.x))
                   + (1.0 - step(0.08, distance(uv, vec2(current_x, f(current_x)))));
    function = clamp(function, 0.0, 1.0);
    color -= function;
    color = clamp(color, 0.0, 1.0);
    color += function * vec3(1.0, 0.5, 0.0);

    outColor = vec4(
        color,
    1.0);
}