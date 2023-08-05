"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lex = void 0;
var process_1 = require("process");
var TAB_SIZE = 4;
var isAlpha = function (char) {
    return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char);
};
var isWhitespace = function (char) { return char === " "; };
var lexKleen = function (type, discriminator, maxSize) {
    if (maxSize === void 0) { maxSize = undefined; }
    return function (source, index, context) {
        var newIndex = index;
        if (discriminator(source[newIndex])) {
            var tokenString = "";
            while (newIndex < source.length &&
                discriminator(source[newIndex]) &&
                (maxSize === undefined || tokenString.length < maxSize)) {
                tokenString += source[newIndex];
                newIndex++;
            }
            return {
                tokens: [{ type: type, value: tokenString, index: index }],
                newIndex: newIndex,
                newContext: context,
            };
        }
        return undefined;
    };
};
var lexAlpha = lexKleen("alpha", isAlpha);
var lexWhitespace = lexKleen("whitespace", isWhitespace);
var lexIndent = function (source, index, _a) {
    var indentationLevel = _a.indentationLevel;
    var newIndex = index;
    if (source[newIndex] === "\n") {
        newIndex++;
        var newIndentationLevel = 0;
        while (newIndex + TAB_SIZE < source.length &&
            source.slice(newIndex, newIndex + TAB_SIZE) === " ".repeat(TAB_SIZE)) {
            newIndex += TAB_SIZE;
            newIndentationLevel++;
        }
        if (newIndex < source.length && source[newIndex] === "\n") {
            // temporary way of allowing empty lines without deindenting
            return {
                tokens: [],
                newContext: { indentationLevel: indentationLevel },
                newIndex: newIndex,
            };
        }
        var type = void 0;
        if (newIndentationLevel === indentationLevel) {
            type = "newline";
        }
        else if (newIndentationLevel < indentationLevel) {
            type = "dedent";
        }
        else {
            // newIndentationLevel > indentationLevel
            type = "indent";
        }
        var tokens = [];
        if (type !== "newline") {
            for (var i = 0; i < Math.abs(newIndentationLevel - indentationLevel); i++) {
                tokens.push({ type: type, index: index });
            }
        }
        else {
            tokens = [{ type: type, index: index }];
        }
        return {
            tokens: tokens,
            newContext: { indentationLevel: newIndentationLevel },
            newIndex: newIndex,
        };
    }
    else {
        return undefined;
    }
};
var lexNumber = lexKleen("number-literal", function (c) {
    return "0123456789".includes(c);
});
var lexString = function (source, index, context) {
    var endQuoteIndex = index;
    if (source[index] === '"') {
        endQuoteIndex++;
        while (endQuoteIndex < source.length && source[endQuoteIndex] !== '"') {
            endQuoteIndex++;
        }
        if (endQuoteIndex >= source.length) {
            console.log("UNCLOSED STRING. >:(");
            (0, process_1.exit)(1);
        }
        else {
            return {
                tokens: [
                    {
                        type: "string-literal",
                        value: source.slice(index + 1, endQuoteIndex),
                        index: index,
                    },
                ],
                newIndex: endQuoteIndex + 1,
                newContext: context,
            };
        }
    }
    else {
        return undefined;
    }
};
var lexFallback = lexKleen("special", function (_char) { return true; }, 1);
var lex = function (source) {
    var e_1, _a;
    var index = 0;
    var tokens = [];
    var lexers = [
        lexAlpha,
        lexWhitespace,
        lexIndent,
        lexNumber,
        lexString,
        lexFallback,
    ];
    var context = {
        indentationLevel: 0,
    };
    while (index < source.length) {
        var foundLex = false;
        try {
            for (var lexers_1 = (e_1 = void 0, __values(lexers)), lexers_1_1 = lexers_1.next(); !lexers_1_1.done; lexers_1_1 = lexers_1.next()) {
                var lexer = lexers_1_1.value;
                var result = lexer(source, index, context);
                if (result !== undefined) {
                    tokens.push.apply(tokens, __spreadArray([], __read(result.tokens), false));
                    index = result.newIndex;
                    context = result.newContext;
                    foundLex = true;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (lexers_1_1 && !lexers_1_1.done && (_a = lexers_1.return)) _a.call(lexers_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!foundLex) {
            console.log(source.slice(0, index) +
                " >>> INVALID TOKEN!!! <<< " +
                source.slice(index));
            (0, process_1.exit)(1);
        }
    }
    return tokens;
};
exports.lex = lex;
