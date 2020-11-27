const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user');

const app = express();

app.get('/user', function(req, res) {
    res.json('get user');
});

app.post('/user', function(req, res) {

    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                msg: err
            })
        }



        res.json({
            ok: true,
            user: userDB
        })



    });


});

app.put('/user/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'active']);



    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                msg: err
            })
        }



        res.json({
            ok: true,
            user: userDB
        });
    })


});

app.delete('/user', function(req, res) {
    res.json('delete user');
});

module.exports = app;