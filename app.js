const express = require('express');
const projectData = require('./data.json');
const path = require('path');
const createError = require('http-errors');

console.log(projectData.projects[0].image_urls[0]);

const app = express();
app.set('view engine', 'pug');
app.use(express.urlencoded({extended: true}));


app.use('/static', express.static('public'));

app.get('/', (req, res) =>{
    res.render('index', { projectData });
});

app.get('/about', (req, res) =>{
    res.render('about');
});

app.get('/projects/:id', (req, res) =>{
    const { id } = req.params;
    const projectShown = projectData.projects[id];
    res.render('project', { projectShown });
});

const create404Error = (req, res, next) => {
    const err404 = new Error('Page Not Found');
    err404.status = 404;
    err404.message = "Looks like the page you were looking for does not exist";
    console.error(`Error Message: ${err404.message}`, `Error Code: ${err404.status}`);
  };

//404 error for undefined routes
//app.use(create404Error);

//global error handler






app.listen(3000, () => {
    console.log("the app is running on port 3000");
});