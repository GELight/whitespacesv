"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reliabletxt_1 = require("@gelight/reliabletxt");
const StringBuilder_1 = __importDefault(require("./StringBuilder"));
const WsvChar_1 = __importDefault(require("./WsvChar"));
const WsvParserException_1 = __importDefault(require("./WsvParserException"));
class WsvParserCharIterator {
    constructor(text) {
        this.sb = new StringBuilder_1.default();
        this.chars = [];
        this.index = 0;
        this.chars = reliabletxt_1.StringUtil.stringToCodePoints(text);
    }
    getText() {
        return reliabletxt_1.StringUtil.codePointsToString(this.chars);
    }
    getLineInfoString() {
        const lineInfo = this.getLineInfo();
        return `(${lineInfo[1] + 1}, ${lineInfo[2] + 1})`;
    }
    getLineInfo() {
        let lineIndex = 0;
        let linePosition = 0;
        for (let i = 0; i < this.index; i++) {
            if (this.chars[i] === reliabletxt_1.StringUtil.lineBreak) {
                lineIndex++;
                linePosition = 0;
            }
            else {
                linePosition++;
            }
        }
        const a = [this.index, lineIndex, linePosition];
        return a;
    }
    isEndOfText() {
        return this.index >= this.chars.length;
    }
    isChar(c) {
        if (this.isEndOfText()) {
            return false;
        }
        return (this.chars[this.index] === c);
    }
    tryReadChar(c) {
        if (!this.isChar(c)) {
            return false;
        }
        this.index++;
        return true;
    }
    readCommentText() {
        const startIndex = this.index;
        const running = true;
        while (running) {
            if (this.isEndOfText()) {
                break;
            }
            if (this.chars[this.index] === reliabletxt_1.StringUtil.lineBreak) {
                break;
            }
            this.index++;
        }
        return reliabletxt_1.StringUtil.getSubstr(this.chars, startIndex, (this.index - startIndex));
    }
    readWhitespaceOrNull() {
        const startIndex = this.index;
        const running = true;
        while (running) {
            if (this.isEndOfText()) {
                break;
            }
            const c = this.chars[this.index];
            if (c === reliabletxt_1.StringUtil.lineBreak) {
                break;
            }
            if (!WsvChar_1.default.isWhitespace(c)) {
                break;
            }
            this.index++;
        }
        if (this.index === startIndex) {
            return null;
        }
        return reliabletxt_1.StringUtil.getSubstr(this.chars, startIndex, (this.index - startIndex));
    }
    readString() {
        this.sb.clear();
        const running = true;
        while (running) {
            if (this.isEndOfText()) {
                throw new WsvParserException_1.default(this, "String not closed");
            }
            const c = this.chars[this.index];
            if (c === reliabletxt_1.StringUtil.lineBreak) {
                throw new WsvParserException_1.default(this, "String not closed in starting line");
            }
            else if (c === reliabletxt_1.StringUtil.doubleQuote) {
                this.index++;
                if (this.tryReadChar(reliabletxt_1.StringUtil.doubleQuote)) {
                    this.sb.appendCodePoint(reliabletxt_1.StringUtil.doubleQuote);
                }
                else if (this.tryReadChar(reliabletxt_1.StringUtil.slash)) {
                    if (!this.tryReadChar(reliabletxt_1.StringUtil.doubleQuote)) {
                        throw new WsvParserException_1.default(this, "String expected after linebreak slash");
                    }
                    this.sb.appendCodePoint(reliabletxt_1.StringUtil.lineBreak);
                }
                else {
                    break;
                }
            }
            else {
                this.sb.appendCodePoint(c);
                this.index++;
            }
        }
        return this.sb.toString();
    }
    readValue() {
        const startIndex = this.index;
        const running = true;
        while (running) {
            if (this.isEndOfText()) {
                break;
            }
            const c = this.chars[this.index];
            if (WsvChar_1.default.isWhitespace(c) || c === reliabletxt_1.StringUtil.hash) {
                break;
            }
            if (c === reliabletxt_1.StringUtil.doubleQuote) {
                throw new WsvParserException_1.default(this, "String starting in value");
            }
            this.index++;
        }
        if (this.index === startIndex) {
            throw new WsvParserException_1.default(this, "Invalid value");
        }
        return reliabletxt_1.StringUtil.getSubstr(this.chars, startIndex, (this.index - startIndex));
    }
}
exports.default = WsvParserCharIterator;
//# sourceMappingURL=WsvParserCharIterator.js.map