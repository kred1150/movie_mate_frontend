<script>
import axios from "axios";
export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          console.log("LogIn Response", response);
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("flashMessage", "Logged In!");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid username or password."];
          this.username = "";
          this.password = "";
        });
    },
  },
};
</script>

<template>
  <div class="container">
    <div id="login-row" class="row justify-content-center align-items-center">
      <div id="login-column" class="col-md-6">
        <div id="login-box" class="col-md-12">
          <form v-on:submit.prevent="submit()">
            <h1>Login</h1>
            <ul>
              <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
            <div class="mb-3">
              <label class="form-label">Username:</label>
              <input type="username" class="form-control" v-model="newSessionParams.username" />
            </div>
            <div class="mb-3">
              <label class="form-label">Password:</label>
              <input type="password" class="form-control" v-model="newSessionParams.password" />
            </div>
            <input class="btn btn-primary mb-3" type="submit" value="Submit" />
          </form>
          <div id="register-link" class="text-right">
            <a href="/signup" class="text-info">Register here</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
