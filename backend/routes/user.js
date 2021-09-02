const router = require('express').Router();
const User = require('../models/user');
const mongoose = require('mongoose');

router.post('/login', (req, res) => {
    let body = req.body;
    let username = body['username'];
    let password = body['password'];

    return User.find({ username: username, password: password }).exec()
    .then((result) => {
        res.status(200).send(result);

    })
    .catch(err => res.status(400).send(err));

})

module.exports = router;