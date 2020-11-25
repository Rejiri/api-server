const jwToken = require('jsonwebtoken');
const config = require('../config');
const User = require('../models').models.users;

exports.signin = (req, res, next) => {
    User.findOne({ username: req.body.username })
        .exec((error, user) => {
            if (error) {
                res.status(500).send({ message: error });
                return;
            }

            if (!user) {
                return res.status(404).send({ message: "Error: Not found" });
            }

            if (!user.verifyPassword(req.body.password)) {
                return res.status(401).send({ message: "Error: Invalid Username/Password" });
            }

            var accessToken = jwToken.sign({ id: user._id }, config.secret, { expiresIn: 1800 });

            res.status(200).send({
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                accessToken: accessToken
            });
        });
};

exports.signup = (req, res, next) => {
    User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] })
        .exec((error, data) => {
            if (error) {
                return res.status(500).send({ message: error });
            }

            if (data) {
                return res.status(400).send({ message: "Error: Invalid Username/Email" });
            }


            const user = new User({
                fullName: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone,
                username: req.body.username
            });
            user.setPassword(req.body.password);

            user.save().then(data => {
                res.send({ message: "User has been registered successfully" });
            }).catch(error => {
                res.status(500).send({ message: error.message });
            });
        });
};