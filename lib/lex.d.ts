export type Token = {
    index: number;
} & ({
    type: "alpha";
    value: string;
} | {
    type: "special";
    value: string;
} | {
    type: "string-literal";
    value: string;
} | {
    type: "number-literal";
    value: string;
} | {
    type: "raw-id";
    value: string;
} | {
    type: "whitespace";
} | {
    type: "newline";
} | {
    type: "indent";
} | {
    type: "dedent";
});
export declare const lex: (source: string) => Token[];
