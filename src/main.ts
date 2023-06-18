import debounce from "debounce";

import vertexShaderSource from "./vert.glsl?raw";
import fragmentShaderSource from "./frag.glsl?raw";
import { mix } from "./utils";
import "./style.css";

const canvas = document.querySelector("canvas")!;

const gl = canvas.getContext("webgl2")!;
const vertShader = gl.createShader(gl.VERTEX_SHADER)!;
const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!;

gl.shaderSource(vertShader, vertexShaderSource);
gl.shaderSource(fragShader, fragmentShaderSource);

gl.compileShader(vertShader);
gl.compileShader(fragShader);

const program = gl.createProgram()!;

gl.attachShader(program, vertShader);
gl.attachShader(program, fragShader);

gl.linkProgram(program);

const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

const positionUniformLocation = gl.getUniformLocation(program, "u_position")!;
const rotationUniformLocation = gl.getUniformLocation(program, "u_rotation")!;
const scaleUniformLocation = gl.getUniformLocation(program, "u_scale")!;
const aspectUniformLocation = gl.getUniformLocation(program, "u_aspect")!;
const colorUniformLocation = gl.getUniformLocation(program, "u_color")!;

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

// prettier-ignore
const positions = [
	-1, 1,
	-1, -1,
	2, -1,

	-1, 1,
	2, 1,
	2, -1,

	2, 3,
	5, 0,
	2, -3,

	0, 0,
	1, 1,
	0, 1,
];
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array(positions.map((n) => n / 10)),
  gl.STATIC_DRAW
);

const vao = gl.createVertexArray();

gl.bindVertexArray(vao);
gl.enableVertexAttribArray(positionAttributeLocation);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

gl.useProgram(program);
gl.bindVertexArray(vao);

let f: Function;

const input = document.querySelector("textarea")!;

const prelude =
  "const pi = Math.PI; const sin = Math.sin; const cos = Math.cos; const sqrt = Math.sqrt;";

input.value =
  window.location.hash == "" ? `[x, y]` : atob(window.location.hash.slice(1));

f = Function(
  `return (x, y, t) => { ${prelude} return ${input.value}} ;`
) as typeof f;

let t = 0;

input.addEventListener(
  "input",
  debounce(() => {
    f = Function(
      `return (x, y, t) => { ${prelude} return ${input.value}} ;`
    ) as typeof f;
    window.location.hash = btoa(`${input.value}`);
    t = 0;
  }, 200)
);

let lastTime = 0;

const draw = (time: number) => {
  requestAnimationFrame(draw);

  t += (time - lastTime) / 1000;

  lastTime = time;

  canvas.width = window.innerWidth * 1.5;
  canvas.height = window.innerHeight * 1.5;

  gl.viewport(0, 0, canvas.width, canvas.height);

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const NUM = 5;

  for (let x = -NUM * 2; x <= NUM * 2; x++) {
    for (let y = -NUM; y <= NUM; y++) {
      const swapped = ([x, y]: [number, number]) => [y, x] as const;
      const angle = Math.atan2(...swapped(f.call(undefined)(x, y, t)));
      const len = Math.hypot(...f.call(undefined)(x, y, t));
      gl.uniform2f(positionUniformLocation, x, y);
      gl.uniform1f(rotationUniformLocation, -angle);
      gl.uniform1f(scaleUniformLocation, Math.min(1, len / 3));
      gl.uniform1f(aspectUniformLocation, canvas.width / canvas.height);
      gl.uniform3f(
        colorUniformLocation,
        ...(mix([237, 36, 255], [20, 220, 255], len / 6).map(
          (c) => c / 256
        ) as [number, number, number])
      );
      gl.drawArrays(gl.TRIANGLES, 0, positions.length / 2);
    }
  }
};

draw(0);
