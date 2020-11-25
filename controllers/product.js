const Product = require('../models').models.products;

exports.getAll = (req, res) => {
    const filter = req.query.name ? { name: { $regex: new RegExp(req.query.name), $options: "i" } } : {};

    Product.find(filter)
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
};

exports.getSingle = (req, res) => {
    Product.findById(req.params.id)
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
    Product.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then(data => {
            if (data) {
                res.send({ message: "Product has been updated successfully" });
            } else
                res.status(404).send({ message: "Not found" });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
};

exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.id, { useFindAndModify: false })
        .then(data => {
            if (data) {
                res.send({ message: "Product has been deleted successfully" });
            } else {
                res.status(404).send({ message: "Not found" });
            }
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
};

exports.create = (req, res) => {
    const product = new Product({
        code: req.body.code,
        name: req.body.name,
        type: req.body.type,
        count: req.body.count,
        unitPrice: req.body.unitPrice,
        totalPrice: req.body.totalPrice
    });

    product.save()
        .then(data => {
            res.send(data);
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        })
};
