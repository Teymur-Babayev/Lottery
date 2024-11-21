
var con = require('../config/Database');
var constants = require('../config/constants');

exports.validate_login_user = (data, callBack) => {
    con.DBconnection.query(`SELECT * FROM users WHERE email = '${data[1]}' and user_password = '${data[2]}'`, function(err, result) {
        if(result.length > 0) {
            callBack(result);
        }else{
            callBack(constants.key.FORBIDDEN_USER);
        }
    })
}


exports.register_user = (data, callBack) => {
    con.DBconnection.query(`SELECT * FROM users WHERE email = '${data[1]}'`, function(err, result) {
        if(result.length == 0) {
            con.DBconnection.query(`INSERT INTO users (email, user_password,wallet_address) VALUES ('${data[1]}', '${data[3]}','${data[2]}')`, function (err, result) {
                callBack(constants.key.SUCCESS_RESULT);
            })
        }else{
            callBack(constants.key.ALEADY_EXIST_DATA);
        }
    })
}