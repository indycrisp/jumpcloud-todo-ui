<template>
  <v-list-item
    :class="[
      todo-list-item,
      error ? 'todo-list-item-error' : '',
    ]"
    v-bind:id="`todo-item-${todo.id}`"
  >
    <v-list-item-content v-if="error" class="red--text texty--dark-4">{{error}}</v-list-item-content>
    <v-list-item-action v-if="!error">
      <v-checkbox tabindex="-1" @change="completeTodo(todo)" v-model='todo.done'></v-checkbox>
    </v-list-item-action>
    <v-list-item-content v-if="!error">
      <v-text-field
        v-on:blur="updateDescription(todo, $event.target)"
        v-on:keyup.enter="updateDescription(todo, $event.target)"
        v-on:click="editDescription()"
        v-model='todo.description'
        append-icon="delete"
        @click:append="deleteTodo(todo)"
      ></v-text-field>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  //TODO test fail case, move to data file somewhere
  // TODO make sure inputs don't allow HTML
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
        updateTodo(todo).then((response) => {
          if (response.err) {
            this.error = response.err;
            this.todo.done = !this.todo.done;
          }
        });
      },
      updateDescription(todo, target) {
        $(target).blur();
        this.error = null;
        this.description = $(target).val();
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
  .todo-list-item {
    height: 60px;
  }

  .todo-list-item-error {
    height: 86px;
    border: 1px solid red;
  }
</style>
