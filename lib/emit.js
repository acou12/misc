"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emit = void 0;
var util_1 = require("./util");
var emit = function (ast) {
    return ast.statements
        .map(emitStatement)
        .map(function (s) { return s + ";"; })
        .join("");
};
exports.emit = emit;
var emitStatement = function (statement) {
    return statement.type === "variable-declaration"
        ? "let ".concat(emitIdentifier(statement.name), "=").concat(emitExpression(statement.rhs))
        : statement.type === "function-declaration"
            ? "let ".concat(emitIdentifier(statement.name), "=(").concat(statement.typedParameters
                .map(function (parameter) { return emitIdentifier(parameter.name); })
                .join(","), ")=>").concat(emitBlock(statement.body))
            : emitExpression(statement);
};
var emitExpression = function (expression) {
    return expression.type === "number-literal"
        ? "".concat(expression.value)
        : expression.type === "string-literal"
            ? "\"".concat(expression.value, "\"")
            : expression.type === "id"
                ? "".concat(emitIdentifier(expression))
                : expression.type === "anonymous-function"
                    ? "(".concat(expression.typedParameters.map(function (parameter) {
                        return emitIdentifier(parameter.name);
                    }), ")=>").concat(emitBlock(expression.body))
                    : "(".concat(emitExpression(expression.function), ")(").concat(expression.parameters
                        .map(emitExpression)
                        .join(","), ")");
};
var emitIdentifier = function (id) {
    return id.value
        .split("")
        .map(function (char) {
        return (0, util_1.isOperator)(char) ? "_$_".concat(char.charCodeAt(0), "_$_") : char;
    })
        .join("");
};
var emitBlock = function (block) {
    return "{".concat(block.statements
        .map(emitStatement)
        .map(function (s) { return s + ";"; })
        .join(""), "}");
};
