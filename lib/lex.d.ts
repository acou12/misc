export type Token = {
    type: "alpha";
    char: string;
} | {
    type: "special";
    char: string;
} | {
    type: "whitespace";
} | {
    type: "newline";
} | {
    type: "indent";
} | {
    type: "dedent";
};
export declare const lex: (source: string) => Token[];
