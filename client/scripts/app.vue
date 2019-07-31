<template>
  <div id='app-container'>
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="todos" class="content">
      <div>Number of tasks: {{todos.length}}</div>
      <div>
        <span>Completed: {{todos.filter(todo => { return todo.done === true }).length}}</span>
        <span>Pending: {{todos.filter(todo => { return todo.done === false }).length}}</span>
      </div>
      <todo-list v-bind:todos="todos"></todo-list>
    </div>
  </div>
</template>

<script>
  import TodoList from './components/TodoList.vue';

  const getTodos = () => {
    return new Promise((resolve) => {
      $.ajax({
        url: 'http://localhost:8004/api/todos',
        type: 'GET'
      })
      .done(data => resolve({ todos: data }))
      .fail(err => resolve({ err : err.responseText }));
    });
  };

  export default {
    name: 'app',
    components: {
      TodoList
    },
    data () {
      return {
        loading : false,
        todos   : [],
        error   : null
      };
    },
    created () {
      this.fetchData();
    },
    methods: {
      fetchData () {
        this.error = this.post = null;
        this.loading = true;
        getTodos().then((response) => {
          this.loading = false;
          if (response.err) {
            this.error = response.err;
          }
          else {
            this.todos = response.todos || [];
          }
        });
      }
    }
  };
</script>
