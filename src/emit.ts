import { Expression, Program, Statement } from "./parse";

export const emit = (ast: Program): string =>
    ast.statements
        .map(emitStatement)
        .map((s) => s + ";")
        .join("");

const emitStatement = (statement: Statement): string =>
    statement.type === "variable-declaration"
        ? `let ${statement.name}=${emitExpression(statement.rhs)}`
        : statement.type === "function-declaration"
        ? `let ${statement.name}=(${statement.typedParameters
              .map((parameter) => parameter.name)
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
        ? `${expression.value}`
        : `(${emitExpression(expression.function)})(${expression.parameters
              .map(emitExpression)
              .join(",")})`;
