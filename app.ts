// app

import * as express from 'express';
import * as path from 'path';
import * as layout from 'express-layout';
import * as bodyParser from 'body-parser';
import * as validator from 'express-validator';
import { routes } from './routes';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as flash from 'express-flash';
import * as helmet from 'helmet';
import * as csrf from 'csurf';

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const middleware = [
  helmet(),
  layout(),
  express.static(path.join(__dirname, 'public')),
  bodyParser.urlencoded({ extended: true }),
  validator(),
  cookieParser(),
  session({
    secret: 'super-secret-key',
    key: 'super-secret-cookie',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }),
  flash(),
  csrf({ cookie: true }),
];
app.use(middleware);

app.use('/', routes);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log(`App running at http://localhost:3000`);
});

// CREATE TABLE users (
//   id uuid primary key,
//   email varchar NOT NULL,
//   pass varchar NOT NULL,
//   firstname varchar NOT NULL,
//   lastname varchar NOT NULL,
//   level int NOT NULL
// );

// CREATE TABLE options (
//   id uuid primary key,
//   user_id uuid NOT NULL,
//   level varchar NOT NULL
// );
