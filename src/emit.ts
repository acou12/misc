import exp = require("constants");
import { Expression, Identifier, Program, Statement } from "./parse";
import { isOperator } from "./util";
import { stat } from "fs";

export const emit = (ast: Program): string =>
    ast.statements
        .map(emitStatement)
        .map((s) => s + ";")
        .join("");

const emitStatement = (statement: Statement): string => {
    switch (statement.type) {
        case "function-declaration":
            return `let ${emitIdentifier(
                statement.name
            )}=(${statement.typedParameters
                .map((parameter) => emitIdentifier(parameter.name))
                .join(",")})=>${emitStatements(statement.body.statements)}`;
        case "variable-declaration":
            return `let ${emitIdentifier(statement.name)}=${emitExpression(
                statement.rhs
            )}`;
        case "reassignment":
            return `${emitIdentifier(statement.name)}=${emitExpression(
                statement.rhs
            )}`;
        case "number-literal":
        case "string-literal":
        case "function-application":
        case "id":
        case "anonymous-function":
        case "expression-block":
            return emitExpression(statement);
    }
};

const emitExpression = (expression: Expression): string => {
    switch (expression.type) {
        case "number-literal":
            return `${expression.value}`;

        case "string-literal":
            return `"${expression.value}"`;

        case "function-application":
            if (
                expression.function.type === "id" &&
                [...expression.function.value].every(isOperator)
            ) {
                return `(${emitExpression(expression.parameters[0])} ${
                    expression.function.value
                } ${emitExpression(expression.parameters[1])})`;
            } else {
                return `(${emitExpression(
                    expression.function
                )})(${expression.parameters.map(emitExpression).join(",")})`;
            }
        case "id":
            return `${emitIdentifier(expression)}`;

        case "anonymous-function":
            return `(${expression.typedParameters.map((parameter) =>
                emitIdentifier(parameter.name)
            )})=>${emitStatements(expression.body.statements)}`;

        case "expression-block":
            return `(() => ${emitStatements(expression.statements)})()`;
    }
};

const emitIdentifier = (id: Identifier): string => id.value;
// .split("")
// .map((char) =>
//     isOperator(char) ? `_$_${char.charCodeAt(0)}_$_` : char
// )
// .join("");

const emitStatements = (statements: Statement[]): string => {
    let result = `{${statements
        .slice(0, -1)
        .map(emitStatement)
        .map((s) => s + ";")
        .join("")}`;
    if (statements.length > 0) {
        const lastStatement = statements.at(-1)!;
        if (
            // :(
            (
                [
                    "number-literal",
                    "string-literal",
                    "anonymous-function",
                    "expression-block",
                    "id",
                    "function-application",
                ] as (typeof lastStatement)[keyof typeof lastStatement][]
            ).includes(lastStatement.type)
        ) {
            result += "return ";
        }
        result += emitStatement(lastStatement) + ";";
    }
    result += "}";
    return result;
};
