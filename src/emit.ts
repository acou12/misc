import { Block, Expression, Identifier, Program, Statement } from "./parse";
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
              .join(",")})=>${emitBlock(statement.body)}`
        : emitExpression(statement);

const emitExpression = (expression: Expression): string =>
    expression.type === "number-literal"
        ? `${expression.value}`
        : expression.type === "string-literal"
        ? `"${expression.value}"`
        : expression.type === "id"
        ? `${emitIdentifier(expression)}`
        : expression.type === "anonymous-function"
        ? `(${expression.typedParameters.map((parameter) =>
              emitIdentifier(parameter.name)
          )})=>${emitBlock(expression.body)}`
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

const emitBlock = (block: Block): string =>
    `{${block.statements
        .map(emitStatement)
        .map((s) => s + ";")
        .join("")}}`;
