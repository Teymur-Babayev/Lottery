import { constant } from "./globalData";

export var allInfo = {
    event: '',
    users: [],
};

export const set_allInfo = (data) => {

    allInfo.event = data[0];
    switch (data[0]) {

        case constant.LOTIN_USER:
            allInfo.users = data;

        case constant.REGISTER_USER:
            allInfo.users = data;

        case constant.GET_TICKETS:
            allInfo.users = data;
            
        case constant.GET_NEW_TICKETS:
            allInfo.users = data;

        case constant.GET_MY_TICKETS:
            allInfo.users = data;
            
        default:
            allInfo = allInfo;
            break;
    }

}
export default { allInfo, set_allInfo };