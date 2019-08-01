<template>
  <v-app>
    <v-content>
      <v-container>
        <v-layout row justify-center class="ma-5">
          <v-flex xs12 sm8>
            <v-card>
              <div v-if="loading" class="loading">
                Loading...
              </div>

              <div v-else-if="error" class="error">
                {{ error }}
              </div>

              <div v-else-if="todos" class="content">
                <todo-list v-bind:todos="todos"></todo-list>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
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
        loading  : false,
        todos    : [],
        error    : null
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
