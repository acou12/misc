"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emit = void 0;
var emit = function (ast) {
    return ast.statements
        .map(emitStatement)
        .map(function (s) { return s + ";"; })
        .join("");
};
exports.emit = emit;
var emitStatement = function (statement) {
    return statement.type === "variable-declaration"
        ? "let ".concat(statement.name, "=").concat(emitExpression(statement.rhs))
        : statement.type === "function-declaration"
            ? "let ".concat(statement.name, "=(").concat(statement.typedParameters
                .map(function (parameter) { return parameter.name; })
                .join(","), ")=>{").concat(statement.body.statements
                .map(emitStatement)
                .map(function (s) { return s + ";"; })
                .join(""), "}")
            : emitExpression(statement);
};
var emitExpression = function (expression) {
    return expression.type === "number-literal"
        ? "".concat(expression.value)
        : expression.type === "string-literal"
            ? "\"".concat(expression.value, "\"")
            : expression.type === "id"
                ? "".concat(expression.value)
                : "(".concat(emitExpression(expression.function), ")(").concat(expression.parameters
                    .map(emitExpression)
                    .join(","), ")");
};
