const express = require('express');
const projectData = require('./data.json');
const path = require('path');
const createError = require('http-errors');


const app = express();
app.set('view engine', 'pug');
app.use(express.urlencoded({extended: true}));


app.use('/static', express.static('public'));

//route to landing page
app.get('/', (req, res,) =>{
    res.render('index', { projectData });
});

//route to about page
app.get('/about', (req, res) =>{
    res.render('about');
});

//route to project pages
app.get('/projects/:id', (req, res) =>{
    const { id } = req.params;
    const projectShown = projectData.projects[id];
    res.render('project', { projectShown });
});

//404 error for undefined routes
app.use((req, res, next) => {
    const err404 = new Error('Page Not Found');
    err404.status = 404;
    err404.message = "Looks like the page you were looking for does not exist!";
    next(err404);
  });

//global error handler
app.use((err, req, res, next) => {
    if(err.status === 404){
        res.render('page-not-found', {err});
    }else{
        err.status = 500;
        err.message = 'Oops something went wrong!'
        console.log(err.message);
        res.render("error.pug", {err});
    }
})

// app.listen(3000, () => {
//     console.log("the app is running on port 3000");
// });

    app.listen(process.env.PORT || 3000);