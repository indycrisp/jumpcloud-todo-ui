<template>
  <v-container>
    <div v-if="error">{{error}}</div>
    <div v-else-if="loading">Loading...</div>
    <v-text-field v-else
      class='create-todo'
      @keyup.enter="createTodo($event.target.value)"
      placeholder='Enter new to-do'
      prepend-inner-icon="add"
    ></v-text-field>
  </v-container>
</template>

<script>
  // TODO test fail case, move to some data file
  // implement loading state
  const createTodo = (todo) => {
    return new Promise((resolve) => {
      $.ajax({
        url: "http://localhost:8004/api/todos/",
        contentType: "application/json",
        type: "POST",
        data: JSON.stringify(todo)
      })
      .done(data => resolve({ todo: data }))
      .fail(err => resolve({ err: err.responseText}));
    });
  };

  export default {
    data () {
      return {
        loading: false,
        error: null
      };
    },
    methods: {
      createTodo(description) {
        this.error = null;
        this.loading = true;
        var todo = { description : description };
        createTodo(todo).then((response) => {
          this.loading = false;
          if (response.err) {
            this.error = response.err;
          }
          else {
            $('.create-todo').val('');
            this.$emit('create-todo', response.todo);
          }
        });
      }
    }
  }
</script>
