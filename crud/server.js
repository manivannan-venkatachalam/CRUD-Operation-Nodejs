const mongoose =require('mongoose');
const express =require('express');
const app  =express();
const user = require('./middleware/services')
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.json());

app.use('/test',user);


app.listen(3000);
