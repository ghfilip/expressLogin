// routes

import * as express from 'express';
import { check, validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
export const routes = express.Router();

import { getUser, verifyLogin, insertUser, usr1, usr2 } from './logic';

// app.use(express.cookieParser());

routes.get('/', async (req, res) => {
  // get cookie
  const cookies = req.cookies;
  // console.log('cookies :: ', cookies);

  const user = await verifyLogin(cookies.login || null);

  if (user) {
    res.render('index', {
      data: user,
      csrfToken: req.csrfToken(),
    });
  } else {
    res.render('login', {
      data: {},
      errors: {},
      csrfToken: req.csrfToken(),
    });
  }
});

routes.get('/login', (req, res) => {
  res.render('login', {
    data: {},
    errors: {},
    csrfToken: req.csrfToken(),
  });
});

routes.get('/populate', async (req, res) => {

  await insertUser(usr1);
  await insertUser(usr2);

  res.render('login', {
    data: {},
    errors: {},
    csrfToken: req.csrfToken(),
  });
});

routes.post('/login', [
  check('email')
    .isEmail()
    .withMessage('That email doesn‘t look right')
    .trim()
    .normalizeEmail(),
  check('pass')
    .isLength({ min: 3 })
    .withMessage('Password is required')
    .trim(),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.render('login', {
      data: req.body, // { email, pass }
      errors: errors.mapped(),
      csrfToken: req.csrfToken(),
    });
  }

  const data = matchedData(req);
  // console.log('Sanitized:', data);

  // check username and pass
  const user = await getUser(data);
  // console.log ('user ::', user.rows);

  if (!user.rowCount) {
    res.render('login', {
      data: req.body, // { email, pass }
      errors: {
        email: {
          msg: 'The email and password do not match',
        }
      },
      csrfToken: req.csrfToken(),
    });
  } else {
    // set a new cookie
    res.cookie('login', user.rows[0].id, { maxAge: 60000, httpOnly: true });
    req.flash('success', 'Logged in successfully!');

    res.redirect('/');
  }
});