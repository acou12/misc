import { consoleTestResultHandler } from "tslint/lib/test";
import { Token } from "./lex";

type Program = {
    type: "program";
    statements: Statement[];
};

type Statement = FunctionDeclaration | VariableDeclaration;

type FunctionDeclaration = {
    type: "function-declaration";
    name: string;
    typedParameters: TypedParameter[];
    returnType: Type;
    body: Block;
};

type VariableDeclaration = {
    type: "variable-declaration";
    keywords: Keyword[];
    name: string;
    rhs: Expression;
};

type Keyword = never;

type TypedParameter = {
    type: "typed-parameter";
    name: string;
    parameterType: Type;
};

type Type = "TODO: ADD TYPES SOON";

type Expression = NumberLiteral | StringLiteral;

type NumberLiteral = {
    type: "number-literal";
    value: number;
};

type StringLiteral = {
    type: "string-literal";
    value: string;
};

type Block = {
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

    const parseStatement = (): Statement | undefined => {
        const token = currentToken();
        if (token.type === "alpha") {
            switch (token.value) {
                case "let":
                    return parseVariableDeclaration();
                case "def":
                    return parseFunctionDeclaration();
                default:
                    return error(
                        "invalid start of statement: should be let or def"
                    );
            }
        } else if (token.type === "newline") {
            index++;
            return undefined;
        } else {
            return error("invalid start of statement: should be alpha");
        }
    };

    const parseVariableDeclaration = (): VariableDeclaration => {
        index++; // skip "let"

        const idToken = currentToken();

        if (idToken.type === "alpha") {
            const name = idToken.value;
            index++;
            consumeValue("special", "=");
            const rhs = parseExpression();
            if (hasTokens()) {
                if (
                    !(
                        currentToken().type === "newline" ||
                        currentToken().type === "dedent"
                    )
                ) {
                    error(
                        "your variable assigment did not end in a nice manner."
                    );
                }
            }
            return {
                type: "variable-declaration",
                keywords: [],
                name,
                rhs,
            };
        } else {
            return error("var name should be an alpha");
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
            // consumeValue('special', ':')
            // const returnType = parseType()
            consumeValue("special", "=");
            const body = parseBlock();
            return {
                type: "function-declaration",
                name,
                typedParameters,
                returnType: "TODO: ADD TYPES SOON",
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
        while (token.type !== "dedent") {
            const statement = parseStatement();
            if (statement !== undefined) {
                statements.push(statement);
            }
            token = currentToken();
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
            return {
                type: "typed-parameter",
                name,
                parameterType: "TODO: ADD TYPES SOON",
            };
        } else {
            return error("parameter must be alpha!!");
        }
    };

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
            return nodes;
        }
    };

    const parseExpression = (): Expression => {
        const token = currentToken();

        switch (token.type) {
            case "string-literal":
                index++;
                return token;
            case "number-literal":
                index++;
                return {
                    ...token,
                    value: parseInt(token.value),
                };
            default:
                return error("man... invalid expression");
        }
    };

    return parseProgram();
};

/*

program = statement, { newline, statement }
statement = function declaration | variable declaration
function_declaration = def, id, "(", { typed param }, ")", ":", type, "=", block
block = indent, { statement }, dedent

*/
