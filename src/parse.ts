import { Token } from "./lex";
import { isOperator } from "./util";

export type Program = {
    type: "program";
    statements: Statement[];
};

export type Statement = FunctionDeclaration | VariableDeclaration | Expression;

export type FunctionDeclaration = {
    type: "function-declaration";
    name: Identifier;
    typedParameters: TypedParameter[];
    returnType: Type;
    body: Block;
};

export type VariableDeclaration = {
    type: "variable-declaration";
    keywords: Keyword[];
    name: Identifier;
    variableType: Type;
    rhs: Expression;
};

export type Keyword = never;

export type TypedParameter = {
    type: "typed-parameter";
    name: Identifier;
    parameterType: Type;
};

export type Type = {
    type: "type";
} & ({ typeType: "int" } | { typeType: "str" });

export type Identifier = {
    type: "id";
    value: string;
};

export type Expression =
    | NumberLiteral
    | StringLiteral
    | FunctionApplication
    | Identifier;

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
        } else {
            let expression = parseExpression();
            if (hasTokens()) {
                consumeType("newline");
            }
            return expression;
        }
    };

    const parseVariableDeclaration = (): VariableDeclaration => {
        index++; // skip "let"

        const name = parseId();
        consumeValue("special", ":");
        const variableType = parseType();
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
        const token = currentToken();

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
        } else {
            return error("type is not an alpha.");
        }
    };

    const parseFunctionDeclaration = (): FunctionDeclaration => {
        index++; // skip "def"

        const name = parseId();
        consumeValue("special", "(");
        const typedParameters = parseSeparatedList(
            parseTypedParameter,
            (t) => t.type === "special" && t.value === ",",
            (t) => t.type === "special" && t.value === ")"
        );
        consumeValue("special", ":");
        const returnType = parseType();
        consumeValue("special", "=");
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
        while (hasTokens() && token.type !== "dedent") {
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

    const parseTypedParameter = (): TypedParameter => {
        const name = parseId();
        consumeValue("special", ":");
        const parameterType = parseType();
        return {
            type: "typed-parameter",
            name,
            parameterType,
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

    const parseExpressionWithCalls = (): Expression => {
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
                if (token.value === "(") {
                    index++;
                    expression = parseExpression();
                    consumeValue("special", ")");
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
                token.value === "("
            ) {
                index++;
                const parameters = parseSeparatedList(
                    parseExpression,
                    (t) => t.type === "special" && t.value === ",",
                    (t) => t.type === "special" && t.value === ")"
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

    const parseExpression = (): Expression => {
        let expression = parseExpressionWithCalls();

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
            const rightExpression = parseExpressionWithCalls();
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

    return parseProgram();
};
