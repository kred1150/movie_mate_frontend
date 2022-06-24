<script>
import axios from "axios";

export default {
  data: function () {
    return {
      movies: [],
    };
  },
  created: function () {
    this.indexMovies();
  },
  methods: {
    indexMovies: function () {
      axios.get("/movies").then((response) => {
        console.log("Index Movies", response);
        this.movies = response.data;
      });
    },
  },
};
</script>

<template>
  <div v-for="movie in movies" :key="movie.id" class="movies">
    <img v-bind:src="movie.poster_path" alt="" />
    <h1>{{ movie.title }}</h1>
    <p>{{ movie.vote_average }}</p>
  </div>
</template>

<style></style>
