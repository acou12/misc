import * as fs from "fs/promises";
import { lex } from "./lex";

const main = async () => {
  const contents = await fs
    .readFile("./examples/hello.hb")
    .then((it) => it.toString());

  const tokens = lex(contents).filter(({ type }) => type !== "whitespace");

  console.log(tokens);
};

main();
