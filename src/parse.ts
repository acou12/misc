import { Token } from "./lex";

export type Program = {
    type: "program";
    statements: Statement[];
};

export type Statement = FunctionDeclaration | VariableDeclaration | Expression;

export type FunctionDeclaration = {
    type: "function-declaration";
    name: string;
    typedParameters: TypedParameter[];
    returnType: Type;
    body: Block;
};

export type VariableDeclaration = {
    type: "variable-declaration";
    keywords: Keyword[];
    name: string;
    variableType: Type;
    rhs: Expression;
};

export type Keyword = never;

export type TypedParameter = {
    type: "typed-parameter";
    name: string;
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

const ALLOWED_OPERATOR_SYMBOLS = "+-!@#$%^&*'?/;:<>`~";
const isOperator = (char: string) => ALLOWED_OPERATOR_SYMBOLS.includes(char);

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

        const idToken = currentToken();

        if (idToken.type === "alpha") {
            const name = idToken.value;
            index++;
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
                    error(
                        "your variable assigment did not end in a nice manner."
                    );
                }
            }
            return {
                type: "variable-declaration",
                keywords: [],
                name,
                variableType,
                rhs,
            };
        } else {
            return error("var name should be an alpha");
        }
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

        const idToken = currentToken();

        if (idToken.type === "alpha") {
            const name = idToken.value;
            index++;
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
        } else {
            return error("fun name should be an alpha");
        }
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
        const token = currentToken();
        if (token.type === "alpha") {
            const name = token.value;
            index++;
            consumeValue("special", ":");
            const parameterType = parseType();
            return {
                type: "typed-parameter",
                name,
                parameterType,
            };
        } else {
            return error("parameter must be alpha!!");
        }
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

    const parseExpression = (): Expression => {
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
                const token = currentToken();
                if (token.type === "special" && token.value === "(") {
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

/*

program = statement, { newline, statement }
statement = function declaration | variable declaration
function_declaration = def, id, "(", { typed param }, ")", ":", type, "=", block
block = indent, { statement }, dedent

*/
