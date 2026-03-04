const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Homes — learnNodeJS' });
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register — learnNodeJS' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login — learnNodeJS' });
});

router.get('/add-home', (req, res) => {
  res.render('add-home', { title: 'Add Home — learnNodeJS' });
});

module.exports = router;