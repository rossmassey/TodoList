const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// absolute file paths
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
    res.sendFile('index.html');
});

const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);

app.listen(port, function() {
    console.log('Server started at http://localhost:' + port);
});
