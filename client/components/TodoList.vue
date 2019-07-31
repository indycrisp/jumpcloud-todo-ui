<template>
  <div>
    <todo v-on:delete-todo="deleteTodo" v-for="todo in todos" v-bind:key="todo.id" :todo.sync="todo"></todo>
    <create-todo v-on:create-todo="createTodo"></create-todo>
  </div>
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
    }
  };
</script>
