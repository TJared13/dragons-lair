require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController');
const {PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const app = express();

app.use(express.json());
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
}));

app.post('/auth/register', authCtrl.register)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
 })
 .then(dbInstance => {
     app.set('db', dbInstance)
     app.listen(PORT, () => console.log(`DB up and Jammin' on ${PORT}`))
 })
 .catch(err => console.log(err));

