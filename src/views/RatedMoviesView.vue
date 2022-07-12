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
      console.log("Movie ID:", movie);
      this.$router.push("/movies/" + movie["movie"]["external_id"]);
    },
    showUser: function (movie) {
      this.current_movie = movie;
      console.log("Movie ID:", movie);
      this.$router.push("/users/" + movie["user"]["user_id"]);
    },
  },
};
</script>

<template>
  <div class="index">
    <div class="card" v-for="movie in rated_movies" :key="movie.id">
      <img v-bind:src="movie['movie']['poster_path']" class="card-img-top" v-on:click="showMoreInfo(movie)" />
      <div class="card-body">
        <h5 class="card-title">{{ movie["movie"]["title"] }}</h5>
        <p class="card-text" v-on:click="showUser(movie)">
          {{ movie["user"]["username"] }}'s Score: {{ movie["rating"]["rating"] }}
        </p>
        <p class="card-text" v-on:click="showUser(movie)">
          {{ movie["user"]["username"] }}'s Review: {{ movie["rating"]["message"] }}
        </p>
      </div>
    </div>
  </div>
</template>

<style></style>
