export const implies = (a: boolean, b: boolean) => (a ? b : true);
export const intercept = (x: any) => (console.log(x), x);
