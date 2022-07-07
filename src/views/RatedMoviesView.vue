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
    // indexCleanRatedMovies: function () {
    //   var index = 0;
    //   while (index < this.ratings.length) {
    //     var movie = {};
    //     movie["rating_id"] = this.ratings[index]["rating"]["id"];
    //     this.rated_movies.push(movie);
    //   }
    //   console.log("Rated Movies", this.rated_movies);
    // },
  },
};
</script>

<template>
  <div class="ratings" v-for="movie in rated_movies" v-bind:key="movie.id">
    <img :src="movie['movie']['poster_path']" alt="" />
    <h2>{{ movie["movie"]["title"] }}</h2>

    <h5>{{ movie["user"]["username"] }}'s Score: {{ movie["rating"]["rating"] }}</h5>
    <h5>{{ movie["user"]["username"] }}'s Review: {{ movie["rating"]["message"] }}</h5>
  </div>
</template>

<style>
img {
  max-height: 50rem;
  max-width: 20rem;
}
</style>
