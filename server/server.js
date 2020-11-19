require('./config/config')

let express = require('express');
const app = express();
const bodyParser = require('body-parser');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())

app.get('/inventory/item', function(req, res) {
    res.json('get Item');
});

app.post('/inventory/item', function(req, res) {

    let body = req.body;

    if (body.item === undefined) {

        res.status(400).json({
            ok: false,
            msg: "el item es necesario"
        })

    } else {
        res.json({
            inventory: body
        })
    }

});

app.put('/inventory/item/:id', function(req, res) {

    let id = req.params.id;

    res.json({
        id
    });
});

app.delete('/inventory/item', function(req, res) {
    res.json('delete Item');
});

app.listen(process.env.PORT, () => {
    console.log('listening port: ', process.env.PORT);
})