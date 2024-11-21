import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './Database.js';

import SequelizeStore from 'connect-session-sequelize';
import FileUpload from 'express-fileupload';


const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

// Middleware
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors ({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use(FileUpload());
app.use(express.static("public"));

// app.use(UserRoute);