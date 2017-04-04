const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('views', './_views')
app.set('view engine', 'ejs')

var routes = require('./_routes/static');
app.use('/', routes);

const port = process.env.ENV || 9000;
app.listen(port, ()=>{
	console.log('Listening on port ' + port);
});
