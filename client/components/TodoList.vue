<template>
  <v-container class='todo-list-container' ref='container'>
    <v-toolbar class='display-1' elevation=0>
      <v-flex class='todo-toolbar'>To-do List</v-flex>
    </v-toolbar>
    <v-container v-if="loading">
      <v-progress-linear indeterminate color="cyan"></v-progress-linear>
    </v-container>
    <v-container v-else>
      <v-subheader class='title'>
        Total: {{todos.length}}
        <v-divider class='mx-4' inset vertical></v-divider>
        <span class="green--text">
          Completed: {{todos.filter(todo => { return todo.done === true }).length}}
        </span>
        <v-divider class='mx-4' inset vertical></v-divider>
        <span class="yellow--text text--darken-3">
          In Progress: {{todos.filter(todo => { return todo.done === false }).length}}
        </span>
        <v-spacer></v-spacer>
        <v-progress-circular :value='progress' :size=46 color='green' class='mr-2 caption'>
          {{progress}}%
        </v-progress-circular>
      </v-subheader>
      <v-list flat dense>
        <create-todo v-on:create-todo="createTodo"></create-todo>
        <v-slide-y-transition name="list-item-transition" tag="div" group>
          <todo v-on:delete-todo="deleteTodo" v-for="todo in todos" v-bind:key="todo.id" :todo.sync="todo"></todo>
        </v-slide-y-transition>
      </v-list>
    </v-container>
  </v-container>
</template>

<script>
  import Todo from './Todo.vue';
  import CreateTodo from './CreateTodo.vue';

  export default {
    props: ['todos', 'loading'],
    components: {
      Todo,
      CreateTodo
    },
    methods: {
      deleteTodo(todo) {
        var todoIndex = this.todos.indexOf(todo);
        this.todos.splice(todoIndex, 1);
      },
      createTodo(todo) {
        this.todos.push(todo);
      }
    },
    computed: {
      completedTasks() {
        return this.todos.filter(todo => { return todo.done === true });
      },
      progress() {
        return this.todos.length > 0 ? Math.round(this.completedTasks.length / this.todos.length * 100) : 0;
      }
    }
  };
</script>

<style>
  .todo-toolbar {
    text-align: center;
  }

  .todo-list-container {
    min-height: 500px;
  }
</style>
