<script>
import axios from "axios";

export default {
  data: function () {
    return {
      movies: [],
      current_movie: {},
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
    showMoreInfo: function (movie) {
      this.current_movie = movie;
      this.$router.push("/movies/" + this.current_movie.id);
    },
  },
};
</script>

<template>
  <div class="movie-cards">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="movie in movies" :key="movie.id">
        <img v-bind:src="movie.poster_path" class="card-img-top" v-on:click="showMoreInfo(movie)" />
        <div class="card-body">
          <h5 class="card-title" v-on:click="showMoreInfo(movie)">{{ movie.title }}</h5>
          <p class="card-text">Average Viewer Score: {{ movie.vote_average }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- <div v-for="movie in movies" :key="movie.id" class="movies">
    <img v-bind:src="movie.poster_path" alt="" />
    <h1>{{ movie.title }}</h1>
    <p>{{ movie.vote_average }}</p>
  </div> -->
</template>

<style>
img {
  max-height: 50rem;
  max-width: 20rem;
}
.movie-cards h5 {
  text-align: center;
}
.movie-cards p {
  text-align: center;
}

.card-body {
  border: 3px;
  border-color: blue;
}
</style>
