const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const User = require('./model/user');
const { result } = require('lodash');

const app = express();

//connect to mongoDB
//mongoose is an ODM library to communicate with the DB
//only start listening after db connects
const dbURI = 'mongodb+srv://tayjiunyuan:bobo@nodejscrashcourse.murrry4.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(error));

//register view enginer
//.set used to saet different properties of the app
app.set('view engine', 'ejs');

//return encoded value if readable form
app.use(express.urlencoded({ extended: true }))

app.get('/all-users', (req, res) => {
    User.find()
        .then((result) => {
            console.log(result);
            res.render('all-user', { title: 'All Users', users: result } )
        })
        .catch((err) => {
            console.log(err)
        });
});

app.get('/single-user', (req, res) => {
    User.findById('6471f938ff77e1ef4ec8f526')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
});



//middleware runs from top down and finds a handler to handle the request
//next allows the middleware to continue to run after handling
//many different types of 3rd party middleware packages
// app.use((req, res, next) =>{
//     console.log("new request made");
//     console.log("host: ", req.hostname);
//     console.log("path: ", req.path);
//     console.log("method: ", req.method);
//     next();
// })

//give permission to the browser to access static files (eg. css, images) in public folder 
app.use(express.static('public'));
//using morgan to log instead of console.log
app.use(morgan('dev'));

//mongoose and mongol sandbox routes

// app.get('/add-user',(req,res) => {
//     const user = new User({
//         userName: 'Mick',
//         age: 21,
//         gender: 'Male'
//     });
//     user.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) =>{
//             console.log(err)
//         })
// })


//handle a get reqeust at '/'
app.get('/',(req,res) => {
    //ejs render page
    //pass title variable to index.ejs
    res.render('index', { title: 'Home' });
})

app.get('/about', (req,res) => {
    res.render('about');
})

app.get('/all-users/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(result => {
            res.render('single-user', { user: result})
        })
})

app.delete('/all-users/:id', (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
    .then ((result) => {
        res.json({redirect: '/all-users'})
    })
    .catch((err) => {
        console.log(err)
    })
})

app.get('/create-user', (req,res) => {
    res.render('create-user');
})

//form will return an object with the parameters that is the same as the schema thus req.body can be used as parameters for the schema
app.post('/create-user', (req,res) => {
    const user = new User(req.body);
    console.log(req.body)
    user.save()
        .then((result) => {
            res.redirect('/all-users');    
        })
        .catch((err) => {
            console.log(err);
        })
})

//.use takes in any incoming req if it can reach this code aka. not match before this point
//add on status code
app.use((req,res) => {
    res.render('404');
})