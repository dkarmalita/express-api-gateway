const Router = require('express').Router;
// import Account from '../model/account';
// import bodyParser from 'body-parser';
// import passport from 'passport';
// import config from '../config';

// import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';

module.exports = ({ config, db }) => {
  let api = Router();

  // '/v1/account/register'
  api.post('/register', (req, res) => {
    console.log('POST', '/v1/account/register')
  });

  // 'v1/account/login'
  api.post('/login', (req, res) => {
    console.log('POST', '/v1/account/login')
  });

  // '/v1/accounnt/logout'
  api.get('/logout', /* authenticate, */ (req, res) => {
    console.log('GET', '/v1/account/register')
    res.status(200).json({ path: '/v1/account/register' });
  })

  // '/v1/accounnt/me'
  api.get('/me', /* authenticate, */ (req, res) => {
    // throw new Error('oops')
    console.log('GET', '/v1/accounnt/me')
    res.status(200).json({ path: '/v1/accounnt/me' });
  });

  // '/v1/accounnt/error'
  api.get('/error', /* authenticate, */ (req, res) => {
    console.log('GET', '/v1/accounnt/error')
    throw new Error('oops')
    res.status(200).json({ path: '/v1/accounnt/error' });
  });

  return api
}