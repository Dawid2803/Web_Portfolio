const express = require('express');
const projectData = require('./data.json');
const path = require('path');

const app = express();
app.set('view engine', 'pug');

app.use('/static', express.static('public'));





app.get('/', (req, res) =>{
    res.render('index', { projectData });
})

app.listen(3000, () => {
    console.log("the app is running on port 3000");
})