<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      rated_movies: [],
      current_movie: {},
    };
  },
  created: function () {
    this.showUser();
  },
  methods: {
    showUser: function () {
      axios.get("/users/" + localStorage.getItem("user_id") + ".json").then((response) => {
        console.log("Your Rated Movies", response);
        this.user = response.data.user;
        this.rated_movies = response.data.rated_movies;
      });
    },
    showMoreInfo: function (movie) {
      this.current_movie = movie;
      this.$router.push("/movies/" + this.current_movie.id);
    },
    getRatingZone: function (score) {
      if (score >= 8.0) {
        return "green";
      } else if (score >= 6.5) {
        return "yellow";
      } else {
        return "red";
      }
    },
  },
};
</script>

<template>
  <h1>Your Profile Page</h1>

  <div class="index">
    <div class="card" v-for="movie in rated_movies" :key="movie.id">
      <img v-bind:src="movie['poster_path']" class="card-img-top" v-on:click="showMoreInfo(movie)" />
      <div class="rated-body">
        <h5 class="rated-title">{{ movie["title"] }}</h5>
        <p :class="`${getRatingZone(movie['rating'])}`" v-on:click="showUser(movie)">
          {{ movie["rating"] }}
        </p>
      </div>
      <div class="rated-text">
        <p :class="`${getRatingZone(movie['rating'])}`" v-on:click="showUser(movie)">
          Your Review: {{ movie["message"] }}
        </p>
      </div>
    </div>
  </div>
</template>

<style></style>
