
var con = require('../config/Database');
var constants = require('../config/constants');

exports.get_tickets = (data, callBack) => {
    try {
        con.DBconnection.query(`SELECT create_order from created_orders ORDER BY id DESC limit 1 `, function (err, latestOrder) {
            const tableName = latestOrder[0].create_order.replace(/[- :]/g, '_');
            con.DBconnection.query(`SELECT * from ((SELECT count(*) as allowTic from \`${tableName}\` where user_id = 0) allowTic,(SELECT count(*) as myTic from \`${tableName}\` where user_id = ${data[1]}) myTic)`, function (err, ticCountInfo) {
                if (!err) {
                    con.DBconnection.query(`SELECT ticket , u.wallet_address from \`${tableName}\` LEFT JOIN users as u on \`${tableName}\`.user_id = u.id`, function (err, activeTic) {
                        if (!err) {
                            callBack([ticCountInfo, activeTic, tableName]);
                        }
                    });
                }
            });
        })
    } catch { callBack(constants.key.FORBIDDEN_USER) }
}

exports.get_new_tickets = (tableName, callBack) => {
    try {
        con.DBconnection.query(`SELECT count(*) as allowTic from \`${tableName}\` where user_id = 0`, function (err, ticCountInfo) {
            if (!err) {
                con.DBconnection.query(`SELECT ticket from \`${tableName}\` where user_id = 0`, function (err, activeTic) {
                    if (!err) {
                        callBack([ticCountInfo, activeTic]);
                    }
                });
            } 
        });
    } catch { callBack(constants.key.FORBIDDEN_USER) }
} 

exports.get_my_tickets = (data, callBack) => {
    try {
        con.DBconnection.query(`SELECT * from ((SELECT count(*) as allowTic from \`${data[1]}\` where user_id = 0) allowTic)`, function (err, ticCountInfo) {
            if (!err) {
                con.DBconnection.query(`SELECT ticket from \`${data[1]}\` where user_id = ${data[2]}`, function (err, activeTic) {
                    if (!err) {
                        callBack([ticCountInfo, activeTic]);
                    }
                });
            }
        });
    } catch { callBack(constants.key.FORBIDDEN_USER) }
} 