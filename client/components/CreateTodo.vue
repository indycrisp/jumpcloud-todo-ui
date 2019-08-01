<template>
  <v-container>
    <v-text-field
      class='create-todo'
      @keyup.enter="createTodo($event.target)"
      placeholder='Enter new to-do'
      prepend-inner-icon="add"
      :error-messages="error"
    ></v-text-field>
  </v-container>
</template>

<script>
  var TodoDataModule = require('../data.js');
  var TodoData = new TodoDataModule();

  export default {
    data () {
      return {
        error: null
      };
    },
    methods: {
      createTodo(target) {
        var description = $(target).val();
        if (!description || description === "") return;

        this.error = null;
        $(target).blur();
        var todo = { description : description };
        TodoData.createTodo(todo).then((response) => {
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
