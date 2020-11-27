const express = require('express');

const Order = require('../models/order');

const app = express();

app.get('/client/orders', function(req, res) {

    let from = req.query.from || 0;
    from = Number(from);

    let to = req.query.to || 100;
    to = Number(to);

    Order.find({ active: true })
        .skip(from)
        .limit(to)
        .exec((err, orders) => {

            if (err) {

                console.log(err);

                return res.status(400).json({
                    ok: false,
                    msg: err
                })

            }

            Order.countDocuments({ active: true }, (err, counting) => { //active: true count active clients

                res.json({
                    ok: true,
                    orders,
                    totalCount: counting
                })

            })

        })

});

app.post('/client/order', function(req, res) {

    let body = req.body;

    let order = new Order({

        idClient: body.idClient,
        idItems: body.idItems,
        itemsQty: body.itemsQty

    })

    order.save((err, orderDB) => {

        if (err) {

            console.log(err);

            return res.status(400).json({
                ok: false,
                msg: err
            })

        }

        res.json({
            ok: true,
            orderDB
        });
    });
});

app.put('/client/order/:id', function(req, res) {

    let id = req.params.id;
    let body = req.body;

    Order.findByIdAndUpdate(id, body, { new: true }, (err, orderDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                msg: err
            })
        }

        res.json({
            ok: true,
            item: orderDB
        });


    })


});

app.delete('/client/order/:id', function(req, res) {

    let id = req.params.id;
    let activeStatus = {
        active: false
    };

    Order.findByIdAndUpdate(id, activeStatus, { new: true }, (err, erasedOrder) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!erasedOrder) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'order not found'
                }
            });
        }

        res.json({
            ok: true,
            order: erasedOrder
        })
    })
});

module.exports = app;