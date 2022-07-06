<script>
import axios from "axios";

export default {
  data: function () {
    return {
      rated_movies: [],
      current_movie: {},
    };
  },
  created: function () {
    this.indexRatedMovies();
  },
  methods: {
    indexRatedMovies: function () {
      axios.get("/rated_movies.json").then((response) => {
        console.log("Index Movies", response);
        this.rated_movies = response.data;
      });
    },
    showMoreInfo: function (movie) {
      this.current_movie = movie;
      this.$router.push("/movies/" + this.current_movie.id);
    },
  },
};
</script>

<template>
  <h3>{{ rated_movies }}</h3>
  <div v-for="movie in rated_movies" v-bind:key="movie.id">
    <p>{{ movie.title }}</p>
  </div>
</template>

<style>
img {
  max-height: 50rem;
  max-width: 20rem;
}
</style>
