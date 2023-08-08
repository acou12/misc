import * as fs from "fs/promises";
import { lex } from "./lex";
import { parse } from "./parse";
import { emit } from "./emit";
import { stdLib } from "./stdlib";

const main = async () => {
    const contents = await fs
        .readFile("./examples/hello.hb")
        .then((it) => it.toString());

    const tokens = lex(contents).filter(({ type }) => type !== "whitespace");

    // console.log(tokens);

    const ast = parse(contents, tokens);

    // console.log(JSON.stringify(ast, null, 1));

    const output = emit(ast);

    // console.log(output);

    await fs.writeFile("./out/index.js", output + stdLib + "main();");
};

main();
