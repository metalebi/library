import { MagicDateCalendarTypeEnm } from "../enm/magicDateCalendarTypeEnm";
import { MagicFormatterTypeEnm } from "../enm/magicFormatterTypeEnm";

export interface IMagicFormatterType{
    type:MagicFormatterTypeEnm;
    input?:MagicDateCalendarTypeEnm;
    output?:MagicDateCalendarTypeEnm;
}