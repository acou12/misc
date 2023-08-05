export const implies = (a: boolean, b: boolean) => (a ? b : true);
export const intercept = (x: any) => (console.log(x), x);

export const ALLOWED_OPERATOR_SYMBOLS = "+-!@#$%^&*'?/;:<>`~";
export const isOperator = (char: string) =>
    ALLOWED_OPERATOR_SYMBOLS.includes(char);
