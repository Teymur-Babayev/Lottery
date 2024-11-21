import { allInfo } from '../baseData/index';
import { constant } from '../baseData/globalData';
import axios from 'axios';

export const emit_request = () => {
    // constant.socket.emit(constant.CLIENT_REQUEST, JSON.stringify(allInfo));
}

export const emit_request_used_axios = async (callBack) => {
    const response = await axios.post(constant.SERVER_URL, allInfo);
    callBack(response.data);
}


export const onLoginMe = (callBack) => {
    // constant.socket.on(constant.USER_LOGIN_RESPONSE, data => {
    //     callBack(data);
    // })
}