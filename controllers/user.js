const User = require('../models').models.users;

exports.getAll = (req, res) => {
    User.find({}, { password: 0, salt: 0 })
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
};

exports.getSingle = (req, res) => {
    User.findById(req.params.id, { password: 0, salt: 0 })
        .then(data => {
            if (data)
                res.send(data);
            else
                res.status(404).send({ message: "Not found" });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
};

exports.update = (req, res) => {
    const user = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username
    };

    User.findByIdAndUpdate(req.params.id, user, { useFindAndModify: false })
        .then(data => {
            if (data) {
                res.send({ message: "User has been updated successfully" });
            } else
                res.status(404).send({ message: "Not found" });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
};

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id, { useFindAndModify: false })
        .then(data => {
            if (data) {
                res.send({ message: "User has been deleted successfully" });
            } else {
                res.status(404).send({ message: "Not found" });
            }
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
};

exports.create = (req, res) => {
    return require("./account").signup(req, res);
    // const user = new User({
    //     fullName: req.body.fullName,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     username: req.body.username,
    //     password: req.body.password
    // });

    // user.save()
    //     .then(data => {
    //         res.send(data);
    //     })
    //     .catch(error => {
    //         res.status(500).send({ error: error.message });
    //     })
};