const express = require('express')

const app = express();

//register view enginer
//.set used to saet different properties of the app
app.set('view engine', 'ejs');

//listen for requests on port 3000

app.listen(3000);

//handle a get reqeust at '/'
app.get('/',(req,res) => {
    //specify location of file
    res.sendFile('./views/index.html', { root: __dirname});
})

app.get('/about', (req,res) => {
    //specify location of file
    res.sendFile('./views/about.html', { root: __dirname});
})

//not working
app.get('/about-us', (req,res) => {
    res.redirect('/about')
})

//.use takes in any incoming req if it can reach this code aka. not match before this point
//add on status code
app.use((req,res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname});
})