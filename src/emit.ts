import { Expression, Identifier, Program, Statement } from "./parse";
import { isOperator } from "./util";

export const emit = (ast: Program): string =>
    ast.statements
        .map(emitStatement)
        .map((s) => s + ";")
        .join("");

const emitStatement = (statement: Statement): string =>
    statement.type === "variable-declaration"
        ? `let ${emitIdentifier(statement.name)}=${emitExpression(
              statement.rhs
          )}`
        : statement.type === "function-declaration"
        ? `let ${emitIdentifier(statement.name)}=(${statement.typedParameters
              .map((parameter) => emitIdentifier(parameter.name))
              .join(",")})=>{${statement.body.statements
              .map(emitStatement)
              .map((s) => s + ";")
              .join("")}}`
        : emitExpression(statement);

const emitExpression = (expression: Expression): string =>
    expression.type === "number-literal"
        ? `${expression.value}`
        : expression.type === "string-literal"
        ? `"${expression.value}"`
        : expression.type === "id"
        ? `${emitIdentifier(expression)}`
        : `(${emitExpression(expression.function)})(${expression.parameters
              .map(emitExpression)
              .join(",")})`;

const emitIdentifier = (id: Identifier): string =>
    id.value
        .split("")
        .map((char) =>
            isOperator(char) ? `_$_${char.charCodeAt(0)}_$_` : char
        )
        .join("");
