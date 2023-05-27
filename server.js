const http = require('http');
const fs = require('fs');
const _ = require('lodash')

const server = http.createServer((req,res) => {
    //lodash
    const randomNum = _.random(0,20);
    const greet = _.once(() => {
        console.log(randomNum);
    })

    greet();
    greet();

    res.setHeader('Content-Type', 'text/html')

    let path = './views/'
    //path is the file which is displayed, based on the url given
    switch(req.url) {
        case '/' :
            path += 'index.html'
            res.statusCode = 200;
            break;
        case '/about' :
            path += 'about.html'
            res.statusCode = 200;
            break;   
        default :
            path += '404.html'
            res.statusCode = 404;
            break;                   
    }

    //reads the HTML file and stores it in 'data'
    fs.readFile(path, (err,data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.end(data)
        }
    })

})

server.listen(3000, 'localhost' ,() => {
    console.log('listening for requests on port 3000')
})