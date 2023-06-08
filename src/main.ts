import vert from "./vert.glsl?raw";
import frag from "./frag.glsl?raw";
import "./style.css";

const canvas = document.querySelector("canvas")!;

const gl = canvas.getContext("webgl2")!;

const vertShader = gl.createShader(gl.VERTEX_SHADER)!;
gl.shaderSource(vertShader, vert);
gl.compileShader(vertShader);
if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
  throw new Error(gl.getShaderInfoLog(vertShader)!);
}

const fragShader = gl.createShader(gl.FRAGMENT_SHADER)!;
gl.shaderSource(fragShader, frag);
gl.compileShader(fragShader);
if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
  throw new Error(gl.getShaderInfoLog(fragShader)!);
}

const program = gl.createProgram()!;
gl.attachShader(program, vertShader);
gl.attachShader(program, fragShader);
gl.linkProgram(program);

gl.useProgram(program);

const positionLocation = gl.getAttribLocation(program, "a_position")!;
const colorLocation = gl.getAttribLocation(program, "a_color")!;
const testUniformLocation = gl.getUniformLocation(program, "u_test")!;
const ratioUniformLocation = gl.getUniformLocation(program, "u_ratio")!;

const a = 1;

const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

const positions = [];

for (let theta = 0; theta < 360; theta++) {
  const r = 0.5 + Math.sin((theta / 360) * Math.PI * 12) / 10;
  positions.push(
    ...[
      r * Math.cos(theta * ((2 * Math.PI) / 360)),
      r * Math.sin(theta * ((2 * Math.PI) / 360)),
      0,
      0,
      r * Math.cos((theta + 1) * ((2 * Math.PI) / 360)),
      r * Math.sin((theta + 1) * ((2 * Math.PI) / 360)),
    ]
  );
}

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

gl.enableVertexAttribArray(positionLocation);

let size = 2;
let type = gl.FLOAT;
let normalize = false;
let stride = 0;
let offset = 0;
gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

const colors: number[] = [];

for (let i = 0; i < 360 * 3 * 3; i++) {
  colors.push(Math.random());
}

gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

gl.enableVertexAttribArray(colorLocation);

size = 3;
type = gl.FLOAT;
normalize = false;
stride = 0;
offset = 0;
gl.vertexAttribPointer(colorLocation, size, type, normalize, stride, offset);

gl.useProgram(program);

const primitiveType = gl.TRIANGLES;
const count = 360 * 3;
gl.drawArrays(primitiveType, offset, count);

let u = 0;

const draw = () => {
  requestAnimationFrame(draw);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  gl.uniform1f(testUniformLocation, (u += 1.2) / 20);
  gl.uniform1f(ratioUniformLocation, canvas.width / canvas.height);
  gl.drawArrays(primitiveType, offset, count);
};

draw();
