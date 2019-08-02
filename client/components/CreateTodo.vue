<template>
  <v-container>
    <v-text-field
      class='create-todo'
      v-model="description"
      @keyup.enter="createTodo($event.target)"
      placeholder='Enter new to-do'
      :error-messages="error"
      prepend-inner-icon="chevron_right"
    ></v-text-field>
  </v-container>
</template>

<script>
  var TodoDataModule = require('../data.js');
  var TodoData = new TodoDataModule();

  export default {
    data () {
      return {
        error: null,
        description: "",
      };
    },
    methods: {
      createTodo(target) {
        var description = $(target).val() || "";
        description = description.trim();
        if (!description || description === "") return;

        this.error = null;
        var todo = { description : description };
        TodoData.createTodo(todo).then((response) => {
          if (response.err) {
            this.error = response.err;
          }
          else {
            this.$emit('create-todo', response.todo);
            this.description = "";
          }
        });
      }
    }
  }
</script>
