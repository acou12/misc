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
const timeUniformLocation = gl.getUniformLocation(program, "u_time")!;
const ratioUniformLocation = gl.getUniformLocation(program, "u_ratio")!;

const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([-1, -1, 1, -1, 1, 1, -1, -1, -1, 1, 1, 1]),
  gl.STATIC_DRAW
);
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

gl.useProgram(program);

const primitiveType = gl.TRIANGLES;
const count = 6;
gl.drawArrays(primitiveType, 0, count);

let u = 0;

const draw = () => {
  requestAnimationFrame(draw);

  canvas.width = window.innerWidth * 1.5;
  canvas.height = window.innerHeight * 1.5;

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  u += 0.01;

  gl.uniform1f(timeUniformLocation, u);
  gl.uniform1f(ratioUniformLocation, canvas.width / canvas.height);
  gl.drawArrays(primitiveType, 0, count);
};

draw();
