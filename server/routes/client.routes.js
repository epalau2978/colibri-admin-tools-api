const express = require('express');

const Client = require('../models/client');

const app = express();

app.get('/client', function(req, res) {

    let from = req.query.from || 0;
    from = Number(from);

    let to = req.query.to || 20;
    to = Number(to);

    Client.find({ active: true }) //active: true find active clients
        .skip(from)
        .limit(to)
        .exec((err, clients) => {

            if (err) {

                console.log(err);

                return res.status(400).json({
                    ok: false,
                    msg: err
                })

            }

            Client.countDocuments({ active: true }, (err, counting) => { //active: true count active clients

                res.json({
                    ok: true,
                    clients,
                    totalCount: counting
                })

            })




        })
});

app.post('/client', function(req, res) {

    let body = req.body;



    let client = new Client({

        client_name: body.client_name,
        client_tel: body.client_tel,
        client_address: body.client_address,
        order_items: body.order_items

    })

    client.save((err, clientDB) => {



        if (err) {

            console.log(err);

            return res.status(400).json({
                ok: false,
                msg: err
            })

        }

        res.json({
            ok: true,
            clientDB
        });
    });
});

app.put('/client/:id', function(req, res) {

    let id = req.params.id;
    let body = req.body;

    Client.findByIdAndUpdate(id, body, { new: true }, (err, clientDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                msg: err
            })
        }

        res.json({
            ok: true,
            item: clientDB
        });


    })


});

app.delete('/client/:id', function(req, res) {

    let id = req.params.id;
    let activeStatus = {
        active: false
    };

    Client.findByIdAndUpdate(id, activeStatus, { new: true }, (err, erasedClient) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!erasedClient) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Client not found'
                }
            });
        }

        res.json({
            ok: true,
            client: erasedClient
        });

    });


});

module.exports = app;