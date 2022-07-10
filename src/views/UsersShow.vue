<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      rated_movies: [],
    };
  },
  created: function () {
    this.showUser();
  },
  methods: {
    showUser: function () {
      axios.get("/users/" + this.$route.params.id).then((response) => {
        console.log("users Rated Movies", response);
        this.user = response.data.user;
        this.rated_movies = response.data.ratings;
      });
    },
  },
};
</script>

<template>
  <h1>Users Page</h1>
  <p>{{ rated_movies }}</p>
</template>

<style></style>
