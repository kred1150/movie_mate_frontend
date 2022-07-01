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
  <div class="row row-cols-1 row-cols-md-2 g-4">
    <div class="col" v-for="movie in movies" :key="movie.id">
      <img v-bind:src="movie.poster_path" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ movie.title }}</h5>
        <p class="card-text">Average Viewer Score: {{ movie.vote_average }}</p>
      </div>
    </div>
  </div>

  <!-- <div v-for="movie in movies" :key="movie.id" class="movies">
    <img v-bind:src="movie.poster_path" alt="" />
    <h1>{{ movie.title }}</h1>
    <p>{{ movie.vote_average }}</p>
  </div> -->
</template>

<style></style>
