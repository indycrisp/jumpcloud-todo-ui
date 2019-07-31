<template>
  <div v-bind:id="`todo-item-${todo.id}`">
    <div v-if="error">{{error}}</div>
    <div v-else>
      <input type='checkbox' v-on:click="completeTodo(todo)" v-model='todo.done'></input>
      <input v-if="isEditing" @keyup.enter="updateDescription(todo, $event.target.value)" v-on:blur="cancelEdit()" v-model='todo.description'></input>
      <span v-else v-on:click="editDescription()">{{todo.description}}&nbsp;&nbsp;</span>
      <span class="delete" v-on:click="deleteTodo(todo)">delete</span>
    </div>
  </div>
</template>

<script>
  //TODO test fail case, move to data file somewhere
  const updateTodo = (todo) => {
    return new Promise((resolve) => {
      $.ajax({
        url: "http://localhost:8004/api/todos/" + todo.id,
        contentType: 'application/json',
        type: 'PUT',
        data: JSON.stringify(todo)
      })
      .done(data => resolve({ todo: data }))
      .fail(err => resolve({ err: err.responseText }));
    });
  };

  //TODO test fail case
  const deleteTodo = (todo) => {
    return new Promise((resolve) => {
      $.ajax({
        url: "http://localhost:8004/api/todos/" + todo.id,
        type: 'DELETE'
      })
      .done(data => resolve({ todo: data }))
      .fail(err => resolve({ err: err.responseText }));
    });
  };

  export default {
    props: ['todo'],
    data () {
      return {
        error: null,
        isEditing: false
      };
    },
    methods: {
      completeTodo(todo) {
        this.error = null;
        todo.done = !todo.done;
        updateTodo(todo).then((response) => {
          if (response.err) {
            this.error = response.err;
          }
        });
      },
      updateDescription(todo, description) {
        this.error = null;
        this.description = description;
        updateTodo(todo).then((response) => {
          if (response.err) {
            this.error = response.err;
          }
          
          this.isEditing = false;
        });
      },
      deleteTodo(todo) {
        this.error = null;
        deleteTodo(todo).then((response) => {
          if (response.err) {
            this.error = response.err;
          }
          else {
            this.$emit('delete-todo', todo);
          }
        });
      },
      editDescription() {
        this.isEditing = true;
      },
      cancelEdit() {
        this.isEditing = false;
      }
    }
  };
</script>

<style>
  .delete {
    cursor: pointer;
    color: blue;
  }
</style>
