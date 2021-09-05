"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reliabletxt_1 = require("@gelight/reliabletxt");
const WsvChar_1 = __importDefault(require("./WsvChar"));
class StringUtilWsv extends reliabletxt_1.StringUtil {
    static isWhitespaceOrEmpty(str) {
        const codePoints = reliabletxt_1.StringUtil.stringToCodePoints(str);
        for (const c of codePoints) {
            if (!WsvChar_1.default.isWhitespace(c)) {
                return false;
            }
        }
        return true;
    }
}
exports.default = StringUtilWsv;
//# sourceMappingURL=StringUtil.js.map