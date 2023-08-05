"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOperator = exports.intercept = exports.implies = void 0;
var implies = function (a, b) { return (a ? b : true); };
exports.implies = implies;
var intercept = function (x) { return (console.log(x), x); };
exports.intercept = intercept;
var ALLOWED_OPERATOR_SYMBOLS = "+-!@#$%^&*'?/;:<>`~";
var isOperator = function (char) {
    return ALLOWED_OPERATOR_SYMBOLS.includes(char);
};
exports.isOperator = isOperator;
