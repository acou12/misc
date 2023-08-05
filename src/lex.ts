import { exit } from "process";
import { ALLOWED_OPERATOR_SYMBOLS, isOperator } from "./util";

const TAB_SIZE = 4;

export type Token = { index: number } & (
    | {
          type: "alpha";
          value: string;
      }
    | {
          type: "special";
          value: string;
      }
    | {
          type: "string-literal";
          value: string;
      }
    | {
          type: "number-literal";
          value: string;
      }
    | {
          type: "raw-id";
          value: string;
      }
    | {
          type: "whitespace";
      }
    | {
          type: "newline";
      }
    | {
          type: "indent";
      }
    | {
          type: "dedent";
      }
);

type LexContext = {
    indentationLevel: number;
};
type Lexer = (
    source: string,
    index: number,
    context: LexContext
) => { tokens: Token[]; newIndex: number; newContext: LexContext } | undefined;

const isAlpha = (char: string) =>
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char);

const isWhitespace = (char: string) => char === " ";

const lexKleen =
    (
        type: Token["type"],
        discriminator: (char: string) => boolean,
        maxSize: number | undefined = undefined
    ): Lexer =>
    (source, index, context) => {
        let newIndex = index;
        if (discriminator(source[newIndex])) {
            let tokenString = "";
            while (
                newIndex < source.length &&
                discriminator(source[newIndex]) &&
                (maxSize === undefined || tokenString.length < maxSize)
            ) {
                tokenString += source[newIndex];
                newIndex++;
            }
            return {
                tokens: [{ type, value: tokenString, index }],
                newIndex,
                newContext: context,
            };
        }
        return undefined;
    };

const lexAlpha: Lexer = lexKleen("alpha", isAlpha);
const lexWhitespace: Lexer = lexKleen("whitespace", isWhitespace);

const lexIndent: Lexer = (source, index, { indentationLevel }) => {
    let newIndex = index;
    if (source[newIndex] === "\n") {
        newIndex++;
        let newIndentationLevel = 0;
        while (
            newIndex + TAB_SIZE < source.length &&
            source.slice(newIndex, newIndex + TAB_SIZE) === " ".repeat(TAB_SIZE)
        ) {
            newIndex += TAB_SIZE;
            newIndentationLevel++;
        }
        if (newIndex < source.length && source[newIndex] === "\n") {
            // temporary way of allowing empty lines without deindenting
            return {
                tokens: [],
                newContext: { indentationLevel },
                newIndex,
            };
        }
        let type: Token["type"];
        if (newIndentationLevel === indentationLevel) {
            type = "newline";
        } else if (newIndentationLevel < indentationLevel) {
            type = "dedent";
        } else {
            // newIndentationLevel > indentationLevel
            type = "indent";
        }
        let tokens: Token[] = [];
        if (type !== "newline") {
            for (
                let i = 0;
                i < Math.abs(newIndentationLevel - indentationLevel);
                i++
            ) {
                tokens.push({ type, index });
            }
        } else {
            tokens = [{ type, index }];
        }
        return {
            tokens,
            newContext: { indentationLevel: newIndentationLevel },
            newIndex,
        };
    } else {
        return undefined;
    }
};

const lexNumber: Lexer = lexKleen("number-literal", (c) =>
    "0123456789".includes(c)
);

const lexSurround =
    (surround: string, type: Token["type"], description: string): Lexer =>
    (source, index, context) => {
        let endQuoteIndex = index;
        if (source[index] === surround) {
            endQuoteIndex++;
            while (
                endQuoteIndex < source.length &&
                source[endQuoteIndex] !== surround
            ) {
                endQuoteIndex++;
            }
            if (endQuoteIndex >= source.length) {
                console.log(`unclosed ${description}. >:(`);
                exit(1);
            } else {
                return {
                    tokens: [
                        {
                            type,
                            value: source.slice(index + 1, endQuoteIndex),
                            index,
                        },
                    ],
                    newIndex: endQuoteIndex + 1,
                    newContext: context,
                };
            }
        } else {
            return undefined;
        }
    };

const lexString = lexSurround('"', "string-literal", "string");
const lexRawId: Lexer = (source, index, context) => {
    const surroundResult = lexSurround("`", "raw-id", "string")(
        source,
        index,
        context
    );
    if (surroundResult === undefined) {
        return undefined;
    } else {
        if (
            !surroundResult.tokens.every(
                (token) =>
                    token.type === "raw-id" &&
                    token.value.split("").every(isOperator)
            )
        ) {
            throw new Error(
                `raw ids can only contain operator characters (${ALLOWED_OPERATOR_SYMBOLS})`
            );
        } else {
            return surroundResult;
        }
    }
};

const lexFallback: Lexer = lexKleen("special", (_char) => true, 1);

export const lex = (source: string): Token[] => {
    let index = 0;
    const tokens: Token[] = [];
    const lexers = [
        lexAlpha,
        lexWhitespace,
        lexIndent,
        lexNumber,
        lexString,
        lexRawId,
        lexFallback,
    ];
    let context: LexContext = {
        indentationLevel: 0,
    };
    while (index < source.length) {
        let foundLex = false;
        for (const lexer of lexers) {
            const result = lexer(source, index, context);
            if (result !== undefined) {
                tokens.push(...result.tokens);
                index = result.newIndex;
                context = result.newContext;
                foundLex = true;
                break;
            }
        }
        if (!foundLex) {
            console.log(
                source.slice(0, index) +
                    " >>> INVALID TOKEN!!! <<< " +
                    source.slice(index)
            );
            exit(1);
        }
    }
    return tokens;
};
