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

const angleLocation = gl.getAttribLocation(program, "a_angle")!;
const colorLocation = gl.getAttribLocation(program, "a_color")!;
const timeUniformLocation = gl.getUniformLocation(program, "u_time")!;
const ratioUniformLocation = gl.getUniformLocation(program, "u_ratio")!;

const vao = gl.createVertexArray();
gl.bindVertexArray(vao);

const angles: number[] = [];
const colors: number[] = [];

for (let theta = 0; theta < 360; theta++) {
  angles.push((theta / 360) * (2 * Math.PI), 1); // outer vertex
  angles.push(0, 0); // center vertex
  angles.push(((theta + 1) / 360) * (2 * Math.PI), 1); // outer vertex
  colors.push(Math.random(), Math.random(), Math.random());
  colors.push(Math.random(), Math.random(), Math.random());
  colors.push(Math.random(), Math.random(), Math.random());
}

console.log(angles);

const angleBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, angleBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(angles), gl.STATIC_DRAW);
gl.enableVertexAttribArray(angleLocation);
gl.vertexAttribPointer(angleLocation, 2, gl.FLOAT, false, 0, 0);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
gl.enableVertexAttribArray(colorLocation);
gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);

const primitiveType = gl.TRIANGLES;
const count = 360 * 3;
gl.drawArrays(primitiveType, 0, count);

let u = 0;

// let rate: number | undefined = undefined;

const draw = () => {
  requestAnimationFrame(draw);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // if (u > 5 * 60 * 1.2) {
  //   if (rate === undefined) {
  //     rate = (u + 1.2) / u;
  //   }
  //   u *= rate;
  // } else {
  u += 1.2;
  // }

  gl.uniform1f(timeUniformLocation, u / 20);
  gl.uniform1f(ratioUniformLocation, canvas.width / canvas.height);
  gl.drawArrays(primitiveType, 0, count);
};

draw();
