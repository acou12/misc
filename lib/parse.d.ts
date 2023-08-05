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
export declare const parse: (source: string, tokens: Token[]) => Program;
export {};
