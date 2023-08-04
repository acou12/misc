"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
var parse = function (tokens) { };
exports.parse = parse;
/*

program = statement, { newline, statement }
statement = function declaration | variable declaration
function_declaration = def, id, "(", { typed param }, ")", ":", type, "=", block
block = indent, { statement }, dedent

*/
