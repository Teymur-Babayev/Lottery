
import io from 'socket.io-client';
// export const socket = io('http://localhost:5000');
// export const socket = io('http://192.168.145.30');

export const constant = {
    // socket :                                     io('http://localhost:5000'),
    ADMIN_SECERET_PASS :                          1524312345,
    LOTIN_USER :                                 'LOTIN_USER',
    SERVER_URL :                                 'http://192.168.145.30:5000/api/CLIENT_REQUEST',
    CLIENT_REQUEST :                             'CLIENT_REQUEST',
    USER_LOGIN_RESPONSE :                        'USER_LOGIN_RESPONSE',
    FORBIDDEN_USER :                             'FORBIDDEN_USER',
    REGISTER_USER :                              'REGISTER_USER',
    SUCCESS_RESULT :                             'SUCCESS_RESULT',
    ALEADY_EXIST_DATA :                          'ALEADY_EXIST_DATA',
    GET_TICKETS :                                'GET_TICKETS',
    FIRST_KEY :                                  'total_ticket',
    SECOND_KEY :                                 'remain_ticket',
    THIRD_KEY :                                  'my_ticket',
    GET_NEW_TICKETS :                            'GET_NEW_TICKETS',
    GET_MY_TICKETS :                             'GET_MY_TICKETS',


    NOTICE_FULL_INPUT_VALUE_MSG :                'All items are required.',
    FORBODDEN_OPERATOR_MSG :                     'FORBODDEN OPERATOR',
    SUCCESS_OPERATOR_MSG :                       'SUCCESS OPERATOR',
    ALEADY_EXIST_MSG :                           'Your information has already been registered.',
    FORBIDDEN_USER_LOGIN_MSG :                   'You are not registered.',
}