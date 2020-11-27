const express = require('express');

const Item = require('../models/product');

const app = express();

app.get('/inventory/items', function(req, res) {
    let from = req.query.from || 0;
    from = Number(from);

    let to = req.query.to || 100;
    to = Number(to);

    Item.find({ active: true }) //active: true find active Items
        .skip(from)
        .limit(to)
        .exec((err, items) => {

            if (err) {

                console.log(err);

                return res.status(400).json({
                    ok: false,
                    msg: err
                })

            }

            Item.countDocuments({ active: true }, (err, counting) => { //active: true count active Items

                res.json({
                    ok: true,
                    items,
                    totalCount: counting
                })

            })




        })
});

app.post('/inventory/item', function(req, res) {

    let body = req.body;
    console.log(body);

    let item = new Item({

        itemName: body.itemName,
        ref: body.ref,
        price: body.price,
        desc: body.desc

    })

    item.save((err, itemDB) => {



        if (err) {

            console.log(err);

            return res.status(400).json({
                ok: false,
                msg: err
            })

        }

        res.json({
            ok: true,
            itemDB
        });
    });
});

app.put('/inventory/item/:id', function(req, res) {

    let id = req.params.id;
    let body = req.body;

    Item.findByIdAndUpdate(id, body, { new: true }, (err, itemDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                msg: err
            })
        }

        res.json({
            ok: true,
            item: itemDB
        });


    })


});

app.delete('/inventory/item/:id', function(req, res) {
    let id = req.params.id;
    let activeStatus = {
        active: false
    };

    Item.findByIdAndUpdate(id, activeStatus, { new: true }, (err, erasedItem) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!erasedItem) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'item not found'
                }
            });
        }

        res.json({
            ok: true,
            Item: erasedItem
        });

    });
});

module.exports = app;