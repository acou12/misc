import { Token } from "./lex";
export type Program = {
    type: "program";
    statements: Statement[];
};
export type Statement = FunctionDeclaration | VariableDeclaration | Expression | Reassignment;
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
export type Expression = NumberLiteral | StringLiteral | FunctionApplication | Identifier | AnonymousFunction | ExpressionBlock;
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
export declare const parse: (source: string, tokens: Token[]) => Program;
