import { exit } from "process";

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
) => { token: Token; newIndex: number; newContext: LexContext } | undefined;

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
                token: { type, value: tokenString, index },
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
        let type: Token["type"];
        if (newIndentationLevel === indentationLevel) {
            type = "newline";
        } else if (newIndentationLevel < indentationLevel) {
            type = "dedent";
        } else {
            // newIndentationLevel > indentationLevel
            type = "indent";
        }
        return {
            token: { type, index },
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

const lexString: Lexer = (source, index, context) => {
    let endQuoteIndex = index;
    if (source[index] === '"') {
        endQuoteIndex++;
        while (index < source.length && source[endQuoteIndex] !== '"') {
            endQuoteIndex++;
        }
        if (endQuoteIndex >= source.length) {
            console.log("UNCLOSED STRING. >:(");
            exit(1);
        } else {
            return {
                token: {
                    type: "string-literal",
                    value: source.slice(index + 1, endQuoteIndex),
                    index,
                },
                newIndex: endQuoteIndex + 1,
                newContext: context,
            };
        }
    } else {
        return undefined;
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
                tokens.push(result.token);
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
