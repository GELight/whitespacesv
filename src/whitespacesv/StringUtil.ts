import { StringUtil } from "@gelight/reliabletxt";
import WsvChar from "./WsvChar";

export default class StringUtilWsv extends StringUtil {

    public static isWhitespaceOrEmpty(str: string): boolean {
        const codePoints = StringUtil.stringToCodePoints(str);
        for (const c of codePoints) {
            if (!WsvChar.isWhitespace(c)) {
                return false;
            }
        }
        return true;
    }

}
