import * as fs from "fs/promises";
import { lex } from "./lex";
import { parse } from "./parse";

const main = async () => {
    const contents = await fs
        .readFile("./examples/hello.hb")
        .then((it) => it.toString());

    const tokens = lex(contents).filter(({ type }) => type !== "whitespace");

    console.log(tokens);

    console.log(JSON.stringify(parse(contents, tokens), null, 2));
};

main();
