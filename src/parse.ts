import { type } from "os";
import { Token } from "./lex";
import { isOperator } from "./util";
import { nextTick } from "process";

export type Program = {
    type: "program";
    statements: Statement[];
};

export type Statement =
    | FunctionDeclaration
    | VariableDeclaration
    | Expression
    | Reassignment;

export type FunctionDeclaration = {
    type: "function-declaration";
    name: Identifier;
    typedParameters: TypedParameter[];
    returnType?: Type;
    body: Block;
};

export type VariableDeclaration = {
    type: "variable-declaration";
    keywords: Keyword[];
    name: Identifier;
    variableType?: Type;
    rhs: Expression;
};

export type Keyword = never;

export type TypedParameter = {
    type: "typed-parameter";
    name: Identifier;
    parameterType?: Type;
};

export type Type = Expression;

export type Identifier = {
    type: "id";
    value: string;
};

export type Expression =
    | NumberLiteral
    | StringLiteral
    | FunctionApplication
    | Identifier
    | AnonymousFunction
    | ExpressionBlock;

export type Reassignment = {
    type: "reassignment";
    name: Identifier;
    rhs: Expression;
};

export type NumberLiteral = {
    type: "number-literal";
    value: number;
};

export type StringLiteral = {
    type: "string-literal";
    value: string;
};

export type FunctionApplication = {
    type: "function-application";
    function: Expression;
    parameters: Expression[];
};

export type Block = {
    type: "block";
    statements: Statement[];
};

export type ExpressionBlock = {
    type: "expression-block";
    statements: Statement[];
};

export type AnonymousFunction = {
    type: "anonymous-function";
    typedParameters: TypedParameter[];
    returnType?: Type;
    body: Block;
};

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

export const parse = (source: string, tokens: Token[]) => {
    let index = 0;

    const hasTokens = () => index < tokens.length;

    const requireHasTokens = () => {
        if (!hasTokens()) error("expected a token here.");
    };

    const currentToken = () => {
        requireHasTokens();
        return tokens[index];
    };

    const consumeValue = <T extends "alpha" | "special">(
        t: T,
        value: string
    ) => {
        const token = currentToken();
        if (!(token.type === t && token.value === value))
            error(
                `tried to consume a ${value}: ${t} -- got ${JSON.stringify(
                    token
                )}`
            );
        index++;
    };

    const consumeType = <T extends Token["type"]>(t: T) => {
        const token = currentToken();
        if (!(token.type === t))
            error(`tried to consume a ${t} -- got ${JSON.stringify(token)}`);
        index++;
    };

    const error = (message: string): never => {
        console.log(
            source.slice(
                0,
                tokens[Math.min(index + 1, tokens.length - 1)].index
            ) + "<<< :("
        );
        throw new Error(message);
    };

    const parseProgram = (): Program => {
        let statements: Statement[] = [];
        while (hasTokens()) {
            const statement = parseStatement();
            if (statement !== undefined) {
                statements.push(statement);
            }
        }
        return {
            type: "program",
            statements,
        };
    };

    const parseStatement = (): Statement => {
        const token = currentToken();
        if (token.type === "alpha" && token.value === "let") {
            return parseVariableDeclaration();
        } else if (token.type === "alpha" && token.value === "def") {
            return parseFunctionDeclaration();
        } else if (
            token.type === "alpha" &&
            index + 1 < tokens.length &&
            tokens[index + 1].type === "special" &&
            (tokens[index + 1] as Token & { type: "special" }).value === "="
        ) {
            return parseReassignment({ type: "id", value: token.value });
        } else {
            let expression = parseExpression();
            if (hasTokens()) {
                const token = currentToken();
                if (!(token.type === "newline" || token.type === "dedent")) {
                    return error("invalid end of statement.");
                }
                if (token.type === "newline") {
                    index++;
                }
            }
            return expression;
        }
    };

    const parseReassignment = (id: Identifier): Reassignment => {
        index += 2;
        const expression = parseExpression();
        if (hasTokens()) {
            if (
                currentToken().type === "newline" ||
                currentToken().type === "dedent"
            ) {
                index++;
            } else {
                error("your variable assigment did not end in a nice manner.");
            }
        }
        return {
            type: "reassignment",
            name: id,
            rhs: expression,
        };
    };

    const hasType = <T extends "special" | "alpha">(type: T, value: string) => {
        const token = currentToken();
        return token.type === type && token.value === value;
    };

    const parseVariableDeclaration = (): VariableDeclaration => {
        index++; // skip "let"

        const name = parseId();
        let variableType: Type | undefined = undefined;
        if (hasType("special", ":")) {
            index++;
            variableType = parseType();
        }
        consumeValue("special", "=");
        const rhs = parseExpression();
        if (hasTokens()) {
            if (
                currentToken().type === "newline" ||
                currentToken().type === "dedent"
            ) {
                index++;
            } else {
                error("your variable assigment did not end in a nice manner.");
            }
        }
        return {
            type: "variable-declaration",
            keywords: [],
            name,
            variableType,
            rhs,
        };
    };

    const parseType = (): Type => {
        return parseExpression(["[", "]"]);
    };

    const parseFunctionDeclaration = (): FunctionDeclaration => {
        index++; // skip "def"

        const name = parseId();

        let typedParameters: TypedParameter[] = [];

        const possiblyParameterOpen = currentToken();
        if (
            possiblyParameterOpen.type === "special" &&
            possiblyParameterOpen.value === "("
        ) {
            index++;
            typedParameters = parseSeparatedList(
                parseTypedParameter,
                (t) => t.type === "special" && t.value === ",",
                (t) => t.type === "special" && t.value === ")"
            );
        }

        const typeIdentificationToken = currentToken();

        let returnType: Type | undefined = undefined;

        if (
            typeIdentificationToken.type === "special" &&
            typeIdentificationToken.value === "-"
        ) {
            consumeValue("special", "-");
            consumeValue("special", ">");
            returnType = parseType();
        }

        consumeValue("special", ":");
        const token = currentToken();

        let body: Block | undefined;

        if (token.type === "indent") {
            body = parseBlock();
        } else if (token.type === "newline") {
            index++;
            body = {
                type: "block",
                statements: [],
            };
        } else {
            body = {
                type: "block",
                statements: [parseStatement()],
            };
        }
        return {
            type: "function-declaration",
            name,
            typedParameters,
            returnType,
            body,
        };
    };

    const parseBlock = (): Block => {
        consumeType("indent");
        const statements: Statement[] = [];
        let token = currentToken();
        while (
            hasTokens() &&
            token.type !== "dedent" &&
            !(token.type === "special" && token.value === ",")
        ) {
            const statement = parseStatement();
            statements.push(statement);
            if (hasTokens()) {
                token = currentToken();
            }
        }
        index++;
        return {
            type: "block",
            statements,
        };
    };

    const parseTypedParameter = (typed = true): TypedParameter => {
        const name = parseId();
        const token = currentToken();
        return {
            type: "typed-parameter",
            name,
            parameterType: typed ? (index++, parseType()) : undefined,
        };
    };

    /**
     * @returns a list of nodes parsed by `parser`, skipping separators.
     * this consumes the ending token (matching `isEnd`).
     */
    const parseSeparatedList = <Node>(
        parser: () => Node,
        isSeparator: (token: Token) => boolean,
        isEnd: (token: Token) => boolean
    ): Node[] => {
        const nodes: Node[] = [];
        let token = currentToken();
        if (isEnd(token)) {
            index++;
            return nodes;
        } else {
            do {
                nodes.push(parser());
                token = currentToken();
                index++;
            } while (isSeparator(token));
            index--;
            if (!isEnd(currentToken())) error("unclosed list.");
            index++;
            return nodes;
        }
    };

    const parseExpressionWithCalls = ([startFunctionChar, endFunctionChar]: [
        string,
        string
    ]): Expression => {
        const token = currentToken();

        let expression: Expression | undefined = undefined;

        switch (token.type) {
            case "string-literal":
                index++;
                expression = token;
                break;
            case "number-literal":
                index++;
                expression = {
                    ...token,
                    value: parseInt(token.value),
                };
                break;
            case "special":
                if (token.value === startFunctionChar) {
                    index++;
                    expression = parseExpression([
                        startFunctionChar,
                        endFunctionChar,
                    ]);
                    consumeValue("special", endFunctionChar);
                } else if (token.value === "\\") {
                    expression = parseAnonymousFunction();
                } else if (token.value === ":") {
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
            let token: Token;
            while (
                hasTokens() &&
                (token = currentToken()).type === "special" &&
                token.value === startFunctionChar
            ) {
                index++;
                const parameters = parseSeparatedList(
                    parseExpression,
                    (t) => t.type === "special" && t.value === ",",
                    (t) => t.type === "special" && t.value === endFunctionChar
                );
                expression = {
                    type: "function-application",
                    function: expression,
                    parameters,
                };
            }
        }

        return expression;
    };

    const parseExpressionBlock = (): ExpressionBlock => {
        index++; // skip ":"

        const token = currentToken();

        let body;

        if (token.type === "indent") {
            body = parseBlock();
        } else {
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

    const parseOperator = (): string => {
        let operator = "";
        let token: Token;
        while (
            hasTokens() &&
            (token = currentToken()).type === "special" &&
            isOperator(token.value)
        ) {
            operator += token.value;
            index++;
            if (hasTokens()) {
                token = currentToken();
            }
        }
        return operator;
    };

    const parseExpression = (
        functionChar = ["(", ")"] as [string, string]
    ): Expression => {
        let expression = parseExpressionWithCalls(functionChar);

        let token: Token;
        let firstOperator: string | undefined;
        while (
            hasTokens() &&
            (token = currentToken()).type === "special" &&
            isOperator(token.value)
        ) {
            const operator = parseOperator();
            if (firstOperator === undefined) {
                firstOperator = operator;
            } else {
                if (firstOperator !== operator) {
                    return error(
                        "distinct operators used in an expression must be clarified with parenthesis. "
                    );
                }
            }
            const rightExpression = parseExpressionWithCalls(functionChar);
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

    const parseId = (): Identifier => {
        const token = currentToken();
        if (token.type === "alpha" || token.type === "raw-id") {
            index++;
            return {
                type: "id",
                value: token.value,
            };
        } else {
            return error("invalid identifier.");
        }
    };

    const parseAnonymousFunction = (): AnonymousFunction => {
        index++; // skip "\"

        const token = currentToken();

        let typedParameters;
        let returnType = undefined;

        if (token.type === "special" && token.value === "(") {
            index++;
            typedParameters = parseSeparatedList(
                parseTypedParameter,
                (t) => t.type === "special" && t.value === ",",
                (t) => t.type === "special" && t.value === ")"
            );
            consumeValue("special", "-");
            consumeValue("special", ">");
            returnType = parseType();
            consumeValue("special", ":");
        } else if (
            token.type === "alpha" ||
            (token.type === "special" && token.value === ":")
        ) {
            typedParameters = parseSeparatedList(
                () => parseTypedParameter(false),
                (t) => t.type === "special" && t.value === ",",
                (t) => t.type === "special" && t.value === ":"
            );
        } else {
            return error("invalid anonymous function.");
        }

        const preBlockToken = currentToken();

        let body: Block;

        if (preBlockToken.type === "indent") {
            body = parseBlock();
        } else {
            body = { type: "block", statements: [parseExpression()] };
        }

        return {
            type: "anonymous-function",
            typedParameters,
            returnType,
            body,
        };
    };

    return parseProgram();
};
