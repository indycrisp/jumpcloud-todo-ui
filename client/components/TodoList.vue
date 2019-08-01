<template>
  <v-container>
    <v-toolbar class='headline' dark>
      To-do List <v-spacer></v-spacer>{{todos.length}} tasks
    </v-toolbar>
    <v-container>
      <v-subheader class='title'>
        Completed: {{todos.filter(todo => { return todo.done === true }).length}}
        <v-divider class='mx-4' inset vertical></v-divider>
        In Progress: {{todos.filter(todo => { return todo.done === false }).length}}
        <v-spacer></v-spacer>
        <v-progress-circular :value='progress' :size=46 color='green' class='mr-2 caption'>{{progress}}%</v-progress-circular>
      </v-subheader>
      <v-list flat dense>
        <todo v-on:delete-todo="deleteTodo" v-for="todo in todos" v-bind:key="todo.id" :todo.sync="todo"></todo>
        <create-todo v-on:create-todo="createTodo"></create-todo>
      </v-list>
    </v-container>
  </v-container>
</template>

<script>
  import Todo from './Todo.vue';
  import CreateTodo from './CreateTodo.vue';

  export default {
    props: ['todos'],
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
