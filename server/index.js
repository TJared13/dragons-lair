require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController');
const treasureCtrl = require ('./controllers/treasureController');
const auth = require('./middleware/authMiddleware')
const {PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;
const app = express();

app.use(express.json());
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET
}));

// User endpoints
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)

// Treasure endpoints
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.userOnly, treasureCtrl.getUserTreasure)
app.post('/api/treasure/user', auth.userOnly, treasureCtrl.addUserTreasure)
app.get('/api/treasure/all', auth.userOnly, auth.adminsOnly, treasureCtrl.getAllTreasure)

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

