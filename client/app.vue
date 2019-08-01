<template>
  <v-app>
    <v-content>
      <v-container>
        <v-layout row justify-center class="ma-5">
          <v-flex xs12 sm8>
            <v-card>
              <v-subheader v-if="error" class="red--text text--darken-4 headline">Error: {{error}}</v-subheader>
              <div v-else-if="todos" class="content">
                <todo-list :loading="loading" v-bind:todos="todos"></todo-list>
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
        loading  : true,
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
