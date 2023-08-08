"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
    switch (statement.type) {
        case "function-declaration":
            return "let ".concat(emitIdentifier(statement.name), "=(").concat(statement.typedParameters
                .map(function (parameter) { return emitIdentifier(parameter.name); })
                .join(","), ")=>").concat(emitStatements(statement.body.statements));
        case "variable-declaration":
            return "let ".concat(emitIdentifier(statement.name), "=").concat(emitExpression(statement.rhs));
        case "reassignment":
            return "".concat(emitIdentifier(statement.name), "=").concat(emitExpression(statement.rhs));
        case "number-literal":
        case "string-literal":
        case "function-application":
        case "id":
        case "anonymous-function":
        case "expression-block":
            return emitExpression(statement);
    }
};
var emitExpression = function (expression) {
    switch (expression.type) {
        case "number-literal":
            return "".concat(expression.value);
        case "string-literal":
            return "\"".concat(expression.value, "\"");
        case "function-application":
            if (expression.function.type === "id" &&
                __spreadArray([], __read(expression.function.value), false).every(util_1.isOperator)) {
                return "(".concat(emitExpression(expression.parameters[0]), " ").concat(expression.function.value, " ").concat(emitExpression(expression.parameters[1]), ")");
            }
            else {
                return "(".concat(emitExpression(expression.function), ")(").concat(expression.parameters.map(emitExpression).join(","), ")");
            }
        case "id":
            return "".concat(emitIdentifier(expression));
        case "anonymous-function":
            return "(".concat(expression.typedParameters.map(function (parameter) {
                return emitIdentifier(parameter.name);
            }), ")=>").concat(emitStatements(expression.body.statements));
        case "expression-block":
            return "(() => ".concat(emitStatements(expression.statements), ")()");
    }
};
var emitIdentifier = function (id) { return id.value; };
// .split("")
// .map((char) =>
//     isOperator(char) ? `_$_${char.charCodeAt(0)}_$_` : char
// )
// .join("");
var emitStatements = function (statements) {
    var result = "{".concat(statements
        .slice(0, -1)
        .map(emitStatement)
        .map(function (s) { return s + ";"; })
        .join(""));
    if (statements.length > 0) {
        var lastStatement = statements.at(-1);
        if (
        // :(
        [
            "number-literal",
            "string-literal",
            "anonymous-function",
            "expression-block",
            "id",
            "function-application",
        ].includes(lastStatement.type)) {
            result += "return ";
        }
        result += emitStatement(lastStatement) + ";";
    }
    result += "}";
    return result;
};
