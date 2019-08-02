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
        @click:append="deleteTodo(todo)"
      >
        <template slot="append">
          <v-icon
            color="green"
            :class="[
              'request-success-check-hidden',
              success ? 'request-success-check' : ''
            ]"
          >check</v-icon>
        </template>
        <template slot="append-outer">
          <v-icon @click="deleteTodo(todo)">delete</v-icon>
        </template>
      </v-text-field>
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
        isEditing: false,
        success: false
      };
    },
    methods: {
      completeTodo(todo) {
        this.error = null;
        this.success = false;
        TodoData.updateTodo(todo).then((response) => {
          if (response.err) {
            this.error = response.err;
            this.todo.done = !this.todo.done;
          }
          else {
            this.success = true;
          }
        });
      },
      updateDescription(todo, target) {
        $(target).blur();
        this.error = null;
        this.success = false;
        this.description = $(target).val();
        TodoData.updateTodo(todo).then((response) => {
          if (response.err) {
            this.error = response.err;
          }
          else {
            this.success = true;
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
    border: 1px solid red;
  }

  .request-success-check-hidden {
    opacity: 0;
  }

  .request-success-check {
    -webkit-animation: fadeinout 1s linear forwards;
    animation: fadeinout 1s linear forwards;
  }

  @-webkit-keyframes fadeinout {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }

  @keyframes fadeinout {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }
</style>
