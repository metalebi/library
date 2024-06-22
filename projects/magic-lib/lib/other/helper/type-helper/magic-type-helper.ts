import { IMagicFormatterType } from "../../model/interface/magicFormatterType.interface";

export class MagicTypeHelper {
    static clone<T= any>(obj: any): T {
        const objStr = JSON.stringify(obj);
        return JSON.parse(objStr);
    }
    static isIMagicFormatterType(obj: any): obj is IMagicFormatterType {
        if (obj != undefined && obj != null)
            return (obj as any).hasOwnProperty('type');
        return false;
    }
}