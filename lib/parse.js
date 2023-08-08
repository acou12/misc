"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
var util_1 = require("./util");
// type Either<A, B> =
//     | {
//           type: "left";
//           value: A;
//       }
//     | {
//           type: "right";
//           value: B;
//       };
// const left = <A>(a: A): Either<A, unknown> & { type: "left" } => ({
//     type: "left",
//     value: a,
// });
// const right = <B>(b: B): Either<unknown, B> & { type: "right" } => ({
//     type: "right",
//     value: b,
// });
var parse = function (source, tokens) {
    var index = 0;
    var hasTokens = function () { return index < tokens.length; };
    var requireHasTokens = function () {
        if (!hasTokens())
            error("expected a token here.");
    };
    var currentToken = function () {
        requireHasTokens();
        return tokens[index];
    };
    var consumeValue = function (t, value) {
        var token = currentToken();
        if (!(token.type === t && token.value === value))
            error("tried to consume a ".concat(value, ": ").concat(t, " -- got ").concat(JSON.stringify(token)));
        index++;
    };
    var consumeType = function (t) {
        var token = currentToken();
        if (!(token.type === t))
            error("tried to consume a ".concat(t, " -- got ").concat(JSON.stringify(token)));
        index++;
    };
    var error = function (message) {
        console.log(source.slice(0, tokens[Math.min(index + 1, tokens.length - 1)].index) + "<<< :(");
        throw new Error(message);
    };
    var parseProgram = function () {
        var statements = [];
        while (hasTokens()) {
            var statement = parseStatement();
            if (statement !== undefined) {
                statements.push(statement);
            }
        }
        return {
            type: "program",
            statements: statements,
        };
    };
    var parseStatement = function () {
        var token = currentToken();
        if (token.type === "alpha" && token.value === "let") {
            return parseVariableDeclaration();
        }
        else if (token.type === "alpha" && token.value === "def") {
            return parseFunctionDeclaration();
        }
        else if (token.type === "alpha" &&
            index + 1 < tokens.length &&
            tokens[index + 1].type === "special" &&
            tokens[index + 1].value === "=") {
            return parseReassignment({ type: "id", value: token.value });
        }
        else {
            var expression = parseExpression();
            if (hasTokens()) {
                var token_1 = currentToken();
                if (!(token_1.type === "newline" || token_1.type === "dedent")) {
                    return error("invalid end of statement.");
                }
                if (token_1.type === "newline") {
                    index++;
                }
            }
            return expression;
        }
    };
    var parseReassignment = function (id) {
        index += 2;
        var expression = parseExpression();
        if (hasTokens()) {
            if (currentToken().type === "newline" ||
                currentToken().type === "dedent") {
                index++;
            }
            else {
                error("your variable assigment did not end in a nice manner.");
            }
        }
        return {
            type: "reassignment",
            name: id,
            rhs: expression,
        };
    };
    var hasType = function (type, value) {
        var token = currentToken();
        return token.type === type && token.value === value;
    };
    var parseVariableDeclaration = function () {
        index++; // skip "let"
        var name = parseId();
        var variableType = undefined;
        if (hasType("special", ":")) {
            index++;
            variableType = parseType();
        }
        consumeValue("special", "=");
        var rhs = parseExpression();
        if (hasTokens()) {
            if (currentToken().type === "newline" ||
                currentToken().type === "dedent") {
                index++;
            }
            else {
                error("your variable assigment did not end in a nice manner.");
            }
        }
        return {
            type: "variable-declaration",
            keywords: [],
            name: name,
            variableType: variableType,
            rhs: rhs,
        };
    };
    var parseType = function () {
        return parseExpression(["[", "]"]);
    };
    var parseFunctionDeclaration = function () {
        index++; // skip "def"
        var name = parseId();
        var typedParameters = [];
        var possiblyParameterOpen = currentToken();
        if (possiblyParameterOpen.type === "special" &&
            possiblyParameterOpen.value === "(") {
            index++;
            typedParameters = parseSeparatedList(parseTypedParameter, function (t) { return t.type === "special" && t.value === ","; }, function (t) { return t.type === "special" && t.value === ")"; });
        }
        var typeIdentificationToken = currentToken();
        var returnType = undefined;
        if (typeIdentificationToken.type === "special" &&
            typeIdentificationToken.value === "-") {
            consumeValue("special", "-");
            consumeValue("special", ">");
            returnType = parseType();
        }
        consumeValue("special", ":");
        var token = currentToken();
        var body;
        if (token.type === "indent") {
            body = parseBlock();
        }
        else if (token.type === "newline") {
            index++;
            body = {
                type: "block",
                statements: [],
            };
        }
        else {
            body = {
                type: "block",
                statements: [parseStatement()],
            };
        }
        return {
            type: "function-declaration",
            name: name,
            typedParameters: typedParameters,
            returnType: returnType,
            body: body,
        };
    };
    var parseBlock = function () {
        consumeType("indent");
        var statements = [];
        var token = currentToken();
        while (hasTokens() &&
            token.type !== "dedent" &&
            !(token.type === "special" && token.value === ",")) {
            var statement = parseStatement();
            statements.push(statement);
            if (hasTokens()) {
                token = currentToken();
            }
        }
        index++;
        return {
            type: "block",
            statements: statements,
        };
    };
    var parseTypedParameter = function (typed) {
        if (typed === void 0) { typed = true; }
        var name = parseId();
        var token = currentToken();
        return {
            type: "typed-parameter",
            name: name,
            parameterType: typed ? (index++, parseType()) : undefined,
        };
    };
    /**
     * @returns a list of nodes parsed by `parser`, skipping separators.
     * this consumes the ending token (matching `isEnd`).
     */
    var parseSeparatedList = function (parser, isSeparator, isEnd) {
        var nodes = [];
        var token = currentToken();
        if (isEnd(token)) {
            index++;
            return nodes;
        }
        else {
            do {
                nodes.push(parser());
                token = currentToken();
                index++;
            } while (isSeparator(token));
            index--;
            if (!isEnd(currentToken()))
                error("unclosed list.");
            index++;
            return nodes;
        }
    };
    var parseExpressionWithCalls = function (_a) {
        var _b = __read(_a, 2), startFunctionChar = _b[0], endFunctionChar = _b[1];
        var token = currentToken();
        var expression = undefined;
        switch (token.type) {
            case "string-literal":
                index++;
                expression = token;
                break;
            case "number-literal":
                index++;
                expression = __assign(__assign({}, token), { value: parseInt(token.value) });
                break;
            case "special":
                if (token.value === startFunctionChar) {
                    index++;
                    expression = parseExpression([
                        startFunctionChar,
                        endFunctionChar,
                    ]);
                    consumeValue("special", endFunctionChar);
                }
                else if (token.value === "\\") {
                    expression = parseAnonymousFunction();
                }
                else if (token.value === ":") {
                    expression = parseExpressionBlock();
                }
                break;
            case "alpha":
            case "raw-id":
                expression = parseId();
                break;
        }
        if (expression === undefined) {
            return error("invalid expression.");
        }
        {
            var token_2;
            while (hasTokens() &&
                (token_2 = currentToken()).type === "special" &&
                token_2.value === startFunctionChar) {
                index++;
                var parameters = parseSeparatedList(parseExpression, function (t) { return t.type === "special" && t.value === ","; }, function (t) { return t.type === "special" && t.value === endFunctionChar; });
                expression = {
                    type: "function-application",
                    function: expression,
                    parameters: parameters,
                };
            }
        }
        return expression;
    };
    var parseExpressionBlock = function () {
        index++; // skip ":"
        var token = currentToken();
        var body;
        if (token.type === "indent") {
            body = parseBlock();
        }
        else {
            body = {
                type: "block",
                statements: [parseStatement()],
            };
        }
        return {
            type: "expression-block",
            statements: body.statements,
        };
    };
    var parseOperator = function () {
        var operator = "";
        var token;
        while (hasTokens() &&
            (token = currentToken()).type === "special" &&
            (0, util_1.isOperator)(token.value)) {
            operator += token.value;
            index++;
            if (hasTokens()) {
                token = currentToken();
            }
        }
        return operator;
    };
    var parseExpression = function (functionChar) {
        if (functionChar === void 0) { functionChar = ["(", ")"]; }
        var expression = parseExpressionWithCalls(functionChar);
        var token;
        var firstOperator;
        while (hasTokens() &&
            (token = currentToken()).type === "special" &&
            (0, util_1.isOperator)(token.value)) {
            var operator = parseOperator();
            if (firstOperator === undefined) {
                firstOperator = operator;
            }
            else {
                if (firstOperator !== operator) {
                    return error("distinct operators used in an expression must be clarified with parenthesis. ");
                }
            }
            var rightExpression = parseExpressionWithCalls(functionChar);
            expression = {
                type: "function-application",
                function: {
                    type: "id",
                    value: operator,
                },
                parameters: [expression, rightExpression],
            };
        }
        return expression;
    };
    var parseId = function () {
        var token = currentToken();
        if (token.type === "alpha" || token.type === "raw-id") {
            index++;
            return {
                type: "id",
                value: token.value,
            };
        }
        else {
            return error("invalid identifier.");
        }
    };
    var parseAnonymousFunction = function () {
        index++; // skip "\"
        var token = currentToken();
        var typedParameters;
        var returnType = undefined;
        if (token.type === "special" && token.value === "(") {
            index++;
            typedParameters = parseSeparatedList(parseTypedParameter, function (t) { return t.type === "special" && t.value === ","; }, function (t) { return t.type === "special" && t.value === ")"; });
            consumeValue("special", "-");
            consumeValue("special", ">");
            returnType = parseType();
            consumeValue("special", ":");
        }
        else if (token.type === "alpha" ||
            (token.type === "special" && token.value === ":")) {
            typedParameters = parseSeparatedList(function () { return parseTypedParameter(false); }, function (t) { return t.type === "special" && t.value === ","; }, function (t) { return t.type === "special" && t.value === ":"; });
        }
        else {
            return error("invalid anonymous function.");
        }
        var preBlockToken = currentToken();
        var body;
        if (preBlockToken.type === "indent") {
            body = parseBlock();
        }
        else {
            body = { type: "block", statements: [parseExpression()] };
        }
        return {
            type: "anonymous-function",
            typedParameters: typedParameters,
            returnType: returnType,
            body: body,
        };
    };
    return parseProgram();
};
exports.parse = parse;
