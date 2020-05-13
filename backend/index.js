import config from './app/config';
import { CORS, ErrorHandler, AUTH, validator } from './app/middlewares';
import { messageRules, loginRules, registerRules } from './app/validations';
import { authController } from './app/controllers/authController';
import { messagesController } from './app/controllers/messagesController';
import { repliesController } from './app/controllers/repliesController';

const express = require('express');
const bodyParser = require('body-parser');

const port = config[config.env].port;
const app = express();

app.use(bodyParser.json());
app.use(CORS);

app.use(express.static('build'));

// Auth Routes
app.get('/me', AUTH, authController.getUSer.bind(authController));
app.get('/email_exist/:email', authController.isMailExist.bind(authController));
app.post('/register', validator(registerRules), authController.register.bind(authController));
app.post('/login', validator(loginRules), authController.login.bind(authController));
app.post('/logout', AUTH, authController.logout.bind(authController));


// Messages Routes
app.get('/message', AUTH, messagesController.read.bind(messagesController))
app.post('/message', AUTH, validator(messageRules), messagesController.create.bind(messagesController));
app.put('/message/:id', AUTH, validator(messageRules), messagesController.update.bind(messagesController));
app.delete('/message/:id', AUTH, messagesController.delete.bind(messagesController));

// Replies Routes
app.get('/message/:message_id/replies', AUTH, repliesController.read.bind(repliesController))
app.post('/message/:message_id/replies', AUTH, validator(messageRules), repliesController.create.bind(repliesController));
app.put('/replies/:id', AUTH, validator(messageRules), repliesController.update.bind(repliesController));
app.delete('/replies/:id', AUTH, repliesController.delete.bind(repliesController));

app.use(ErrorHandler);

app.listen(port, () => console.log(`app is running on http://localhost:${port}`))
