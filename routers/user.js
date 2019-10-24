const express = require('express');

const router = express.Router();
const {createUser} = require('../controllers/user')

router.post('/signup', createUser);


module.exports = router;