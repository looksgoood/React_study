import express from 'express';
import path from 'path';

import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

import morgan from 'morgan' // HTTP Request logger
import bodyParser from 'body-parser' // Parse html body

import mongoose from 'mongoose';
import session from 'express-session';

// setup routers & static directory
import api from './routes';

const app = express();
const port = 3000;
const devPort = 4000;

app.use(morgan('dev'));
app.use(bodyParser.json());

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
//mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/codelab');

/* use session */
app.use(session({
    secret: 'CpdeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));

/*
    Express Codes
*/
app.use('/', express.static(path.join(__dirname, './../public')));

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

// handle error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log('Express is listening on port ', port);
})

if (process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}