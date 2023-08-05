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
        if (token.type === "alpha") {
            switch (token.value) {
                case "let":
                    return parseVariableDeclaration();
                case "def":
                    return parseFunctionDeclaration();
                default:
                    return error("invalid start of statement: should be let or def");
            }
        }
        else if (token.type === "newline") {
            index++;
            return undefined;
        }
        else {
            return error("invalid start of statement: should be alpha");
        }
    };
    var parseVariableDeclaration = function () {
        index++; // skip "let"
        var idToken = currentToken();
        if (idToken.type === "alpha") {
            var name = idToken.value;
            index++;
            consumeValue("special", "=");
            var rhs = parseExpression();
            if (hasTokens()) {
                if (!(currentToken().type === "newline" ||
                    currentToken().type === "dedent")) {
                    error("your variable assigment did not end in a nice manner.");
                }
            }
            return {
                type: "variable-declaration",
                keywords: [],
                name: name,
                rhs: rhs,
            };
        }
        else {
            return error("var name should be an alpha");
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
            // consumeValue('special', ':')
            // const returnType = parseType()
            consumeValue("special", "=");
            var body = parseBlock();
            return {
                type: "function-declaration",
                name: name,
                typedParameters: typedParameters,
                returnType: "TODO: ADD TYPES SOON",
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
        while (token.type !== "dedent") {
            var statement = parseStatement();
            if (statement !== undefined) {
                statements.push(statement);
            }
            token = currentToken();
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
            return {
                type: "typed-parameter",
                name: name,
                parameterType: "TODO: ADD TYPES SOON",
            };
        }
        else {
            return error("parameter must be alpha!!");
        }
    };
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
            return nodes;
        }
    };
    var parseExpression = function () {
        var token = currentToken();
        switch (token.type) {
            case "string-literal":
                index++;
                return token;
            case "number-literal":
                index++;
                return __assign(__assign({}, token), { value: parseInt(token.value) });
            default:
                return error("man... invalid expression");
        }
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
