var constants = require('../config/constants');  
var users_model = require('../model/users_model');  
var lottery_model = require('../model/lottery_model.js'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET = '123456';  
const express = require('express');
const router = express.Router();

router.post('/CLIENT_REQUEST', async (req, res) => {

    if (req.body.event === constants.key.LOTIN_USER) {
        users_model.validate_login_user(req.body.users, (callBack) => {
            if (callBack === constants.key.FORBIDDEN_USER) {
                return  res.send(constants.key.FORBIDDEN_USER);
            }
            if (callBack && callBack.length > 0) {
                const token = jwt.sign(
                    { email: callBack[0].email, user_id : callBack[0].id, role: 1524312345 },
                    JWT_SECRET,
                    { expiresIn: '1524312345' } 
                );
                return   res.send(token); 
            }
        });
        return;
    }

    if (req.body.event === constants.key.GET_TICKETS) {
        lottery_model.get_tickets(req.body.users, (response) => {
            res.send(response);
            return;
        });
        return;
    }

    if (req.body.event === constants.key.REGISTER_USER) {
        users_model.register_user(req.body.users, (response) => {
            res.send(response);
        });
    }
    
    if (req.body.event === constants.key.GET_NEW_TICKETS) {
        lottery_model.get_new_tickets(req.body.users[1],(response) => {
            res.send(response); return;
        });
        return;
    }

    if (req.body.event === constants.key.GET_MY_TICKETS) {
        lottery_model.get_my_tickets(req.body.users,(response) => {
            res.send(response); return;
        });
        return;
    }
    else {
        res.status(400).json({ message: 'Invalid event type' });
    }
});

function bind(io, users, sockets) {
    io.of('/').on('connection', client => {

        client.on(constants.key.REQUEST_KEY, req => {
            var data = JSON.parse(req);

            if (data.event === constants.key.FIRST_KEY) {
                let index = users.findIndex(user => user.data.userId === data.userId);
                if (index === -1) {
                    users.push({ data, socket_id: client.id });
                    sockets.push({ socket_id: client.id, socket: client, userId: data.userId });
                }
                users_model.validate_login_user(data.users, (callBack) => {
                    client.emit(constants.key.USER_LOGIN_RESPONSE, callBack);
                });
            }
        });

        client.on('disconnect', () => {
            console.log('Client disconnected:', client.id);
            users = users.filter(user => user.socket_id !== client.id);
            sockets = sockets.filter(socket => socket.socket_id !== client.id);
        });
    });
}

module.exports = {
    bind,
    router
};
