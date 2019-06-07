const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/todo-api', {useNewUrlParser: true});

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');
