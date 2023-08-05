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
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
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
var ALLOWED_OPERATOR_SYMBOLS = "+-!@#$%^&*'?/;:<>`~";
var isOperator = function (char) { return ALLOWED_OPERATOR_SYMBOLS.includes(char); };
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
        else {
            var expression = parseExpression();
            if (hasTokens()) {
                consumeType("newline");
            }
            return expression;
        }
    };
    var parseVariableDeclaration = function () {
        index++; // skip "let"
        var idToken = currentToken();
        if (idToken.type === "alpha") {
            var name = idToken.value;
            index++;
            consumeValue("special", ":");
            var variableType = parseType();
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
        }
        else {
            return error("var name should be an alpha");
        }
    };
    var parseType = function () {
        var token = currentToken();
        if (token.type === "alpha") {
            switch (token.value) {
                case "int":
                case "str":
                    index++;
                    return {
                        type: "type",
                        typeType: token.value,
                    };
                default:
                    return error("invalid type.");
            }
        }
        else {
            return error("type is not an alpha.");
        }
    };
    var parseFunctionDeclaration = function () {
        index++; // skip "def"
        var idToken = currentToken();
        if (idToken.type === "alpha") {
            var name = idToken.value;
            index++;
            consumeValue("special", "(");
            var typedParameters = parseSeparatedList(parseTypedParameter, function (t) { return t.type === "special" && t.value === ","; }, function (t) { return t.type === "special" && t.value === ")"; });
            consumeValue("special", ":");
            var returnType = parseType();
            consumeValue("special", "=");
            var token = currentToken();
            var body = void 0;
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
        }
        else {
            return error("fun name should be an alpha");
        }
    };
    var parseBlock = function () {
        consumeType("indent");
        var statements = [];
        var token = currentToken();
        while (hasTokens() && token.type !== "dedent") {
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
    var parseTypedParameter = function () {
        var token = currentToken();
        if (token.type === "alpha") {
            var name = token.value;
            index++;
            consumeValue("special", ":");
            var parameterType = parseType();
            return {
                type: "typed-parameter",
                name: name,
                parameterType: parameterType,
            };
        }
        else {
            return error("parameter must be alpha!!");
        }
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
    var parseExpression = function () {
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
                if (token.value === "(") {
                    index++;
                    expression = parseExpression();
                    consumeValue("special", ")");
                }
                break;
            case "alpha":
                index++;
                expression = {
                    type: "id",
                    value: token.value,
                };
                break;
        }
        if (expression === undefined) {
            return error("man... invalid expression");
        }
        // todo: sketchy
        while (true) {
            if (hasTokens()) {
                var token_1 = currentToken();
                if (token_1.type === "special" && token_1.value === "(") {
                    index++;
                    var parameters = parseSeparatedList(parseExpression, function (t) { return t.type === "special" && t.value === ","; }, function (t) { return t.type === "special" && t.value === ")"; });
                    expression = {
                        type: "function-application",
                        function: expression,
                        parameters: parameters,
                    };
                    continue;
                }
                break;
            }
            break;
        }
        return expression;
    };
    return parseProgram();
};
exports.parse = parse;
/*

program = statement, { newline, statement }
statement = function declaration | variable declaration
function_declaration = def, id, "(", { typed param }, ")", ":", type, "=", block
block = indent, { statement }, dedent

*/
