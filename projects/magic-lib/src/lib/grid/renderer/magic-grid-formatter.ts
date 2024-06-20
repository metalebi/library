import * as moment from 'jalali-moment';
export var getValueGetterDate = function (request: any): string {
    if (!request?.data)
        return '';
    let res = request?.data;
    let list: string[] = [];
    if (request?.colDef?.field?.length)
        list = request.colDef.field.split('.');
    for (let i = 0; i < list.length; i++)
        if (res)
            res = res[list[i]];

    const data = {
        value: res
    }
    return MagicJalaliDateFormatter(data);
}
export var MagicJalaliDateFormatter = function (params: any) {
    if (params.value != undefined && params.value != null && params.value.length > 3) {
        const valid = params.value.charAt(0) + params.value.charAt(1) + params.value.charAt(2);
        if (valid == '000') return '';
        const dateShamsi = moment(params.value).format('jYYYY/jMM/jDD');
        return dateShamsi;
    } else {
        return '';
    }
}