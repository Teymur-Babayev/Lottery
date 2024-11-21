
import baseData from '../baseData/index';
import { set_allInfo } from '../baseData/index';
import { emit_request,emit_request_used_axios } from '../communication/communicate';

export const sendController = (data) => {
    set_allInfo(data);
    emit_request();
}

export const _sendController = async (data, callBack) => {
    set_allInfo(data);
    await emit_request_used_axios((_callBack) => {
        callBack(_callBack);
    });
}