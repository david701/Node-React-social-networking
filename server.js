const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', './_views')
app.set('view engine', 'ejs')

var routes = require('./_routes/static');
app.use('/', routes);

// 404 last route
app.use(function(req, res, next) {
    res.status(400);
    res.render('404', {title: '404 Error'});
});

const port = process.env.ENV || 9000;
app.listen(port, ()=>{
	console.log('Listening on port ' + port);
});
