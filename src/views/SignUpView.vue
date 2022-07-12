<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newUserParams: {
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="mb-3">
        <label class="form-label">Username:</label>
        <input type="text" class="form-control" v-model="newUserParams.username" />
        <small>{{ 20 - newUserParams.username.length }} characters remaining</small>
      </div>
      <div class="mb-3">
        <label class="form-label">Email:</label>
        <input type="email" class="form-control" v-model="newUserParams.email" />
      </div>
      <div class="mb-3">
        <label class="form-label">Password:</label>
        <input type="password" class="form-control" v-model="newUserParams.password" />
        <small v-if="newUserParams.password.length > 0 && newUserParams.password.length < 6" class="text-danger">
          Must be at least 6 characters
        </small>
      </div>
      <div class="mb-3">
        <label class="form-label">Password confirmation:</label>
        <input type="password" class="form-control" v-model="newUserParams.password_confirmation" />
        <small v-if="newUserParams.password_confirmation !== newUserParams.password" class="text-danger">
          Passwords must match
        </small>
      </div>
      <input class="btn btn-primary mb-3" type="submit" value="Submit" />
    </form>
    <img v-if="status" v-bind:src="`https://http.cat/${status}`" alt="" />
  </div>
</template>
