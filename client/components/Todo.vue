<template>
  <v-list-item
    :class="[
      'todo-list-item',
      error ? 'todo-list-item-error' : '',
    ]"
    v-bind:id="`todo-item-${todo.id}`"
  >
    <v-list-item-content v-if="error" class="red--text texty--dark-4">Error: {{error}}</v-list-item-content>
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
  var TodoDataModule = require('../data.js');
  var TodoData = new TodoDataModule();

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
        TodoData.updateTodo(todo).then((response) => {
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
        TodoData.updateTodo(todo).then((response) => {
          if (response.err) {
            this.error = response.err;
          }
          
          this.isEditing = false;
        });
      },
      deleteTodo(todo) {
        this.error = null;
        TodoData.deleteTodo(todo).then((response) => {
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
    height: 60px;
    border: 1px solid red;
  }
</style>
