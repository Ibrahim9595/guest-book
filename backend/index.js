// import config from './app/config';
// import { CORS, ErrorHandler, AUTH } from './app/middlewares';

// const express = require('express');
// const bodyParser = require('body-parser');

// const port = config[config.env].port;
// const app = express();

// app.use(bodyParser.json());
// app.use(CORS);
// app.use(AUTH);


// app.post('/', (req, res) => {
//     res.json({ data: 'Test' })
// })

// app.use(ErrorHandler);

// app.listen(port, () => console.log(`app is running on http://localhost:${port}`))


// validate({
//     email: '1234@test.com',
//     password: '12345678',
//     name: 'afasf'
// }, {
//     email: ['required', 'email'],
//     name: ['required', 'string'],
//     password: ['required', 'string', 'minLength:8']
// })