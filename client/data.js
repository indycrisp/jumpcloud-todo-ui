function todoData() {
  const baseURL = 'http://localhost:8004/api/todos';

  // Get a list of to-do items
  this.getTodos = () => {
    return new Promise((resolve) => {
      $.ajax({
        url: baseURL,
        type: 'GET'
      })
      .done(data => resolve({ todos: data }))    
      .fail(err => resolve({ err : err.responseText }));
    });
  };

  // Update a single to-do item
  this.updateTodo = (todo) => {
    return new Promise((resolve) => {
      $.ajax({
        url: baseURL + "/" + todo.id,
        contentType: 'application/json',
        type: 'PUT',
        data: JSON.stringify(todo)
      })
      .done(data => resolve({ todo: data }))
      .fail(err => resolve({ err: err.responseText }));
    });
  };

  // Delete a single to-do item
  this.deleteTodo = (todo) => {
    return new Promise((resolve) => {
      $.ajax({
        url: baseURL + "/" + todo.id,
        type: 'DELETE'
      })
      .done(data => resolve({ todo: data }))
      .fail(err => resolve({ err: err.responseText }));
    });
  };

  // Create a single to-do item
  this.createTodo = (todo) => {
    return new Promise((resolve) => {
      $.ajax({
        url: baseURL,
        contentType: "application/json",
        type: "POST",
        data: JSON.stringify(todo)
      })
      .done(data => resolve({ todo: data }))
      .fail(err => resolve({ err: err.responseText}));
    });
  }
}

module.exports = todoData;
