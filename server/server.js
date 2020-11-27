require('./config/config');
require('./routes/product.routes')


const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json());

app.use(require('./routes/product.routes'));
app.use(require('./routes/user.routes'));
app.use(require('./routes/client.routes'));
app.use(require('./routes/order.routes'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {



    if (err) throw error;
    console.log('data base online');
});

app.listen(process.env.PORT, () => {
    console.log('listening port: ', process.env.PORT);
})