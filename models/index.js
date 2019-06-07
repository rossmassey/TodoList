const mongoose = require('mongoose');
mongoose.set('debug', false);
mongoose.set('useFindAndModify', false);
// match to service name in docker
mongoose.connect(
    'mongodb://mongo:27017/todo-list',
    {useNewUrlParser: true})
    .then(function() {
        console.log('Connected to mongo');
    })
    .catch(function(err) {
        console.log(err);
    });

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');
