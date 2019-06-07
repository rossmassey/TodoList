/* eslint-disable no-invalid-this */
/* eslint-disable require-jsdoc */
const ENTER_KEY = 13;

$(document).ready(function() {
    $.getJSON('/api/todos')
        .then(addTodos);

    $('#todoInput').keypress(function(event) {
        if (event.which == ENTER_KEY) {
            createTodo();
        }
    });

    // listener added to list (available on page load)
    $('.list').on('click', 'span', function(event) {
        // dont run parent's (li in this case) functions
        event.stopPropagation();
        removeTodo($(this).parent());
    });

    $('.list').on('click', 'li', function() {
        updateTodo($(this));
    });
});

function updateTodo(todo) {
    const clickedId = todo.data('id');
    const updateUrl = '/api/todos/' + clickedId;
    const isDone = !todo.data('completed');
    const updateData = {completed: isDone};
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData,
    })
        .then(function(updatedTodo) {
            todo.toggleClass('done');
            todo.data('completed', isDone);
        });
};

function removeTodo(todo) {
    const clickedId = todo.data('id');
    const deleteUrl = '/api/todos/' + clickedId;
    $.ajax({
        method: 'DELETE',
        url: deleteUrl,
    })
        .then(function(data) {
            todo.remove();
        })
        .catch(function(err) {
            console.log(err);
        });
};

function addTodos(todos) {
    // add todos to page
    todos.forEach(function(todo) {
        addTodo(todo);
    });
};

function addTodo(todo) {
    const newTodo = $(`<li>` + todo.name
        + '<span><i class="material-icons">delete</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if (todo.completed) {
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
};

function createTodo() {
    const userInput = $('#todoInput').val();
    $.post('/api/todos', {name: userInput})
        .then(function(newTodo) {
            $('#todoInput').val('');
            addTodo(newTodo);
        })
        .catch(function(err) {
            console.log(err);
        });
};
