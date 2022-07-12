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
      if (this.$route.params.id === localStorage.getItem("user_id")) {
        this.$router.push("/profile");
      } else {
        axios.get("/users/" + this.$route.params.id + ".json").then((response) => {
          console.log("users Rated Movies", response);
          this.user = response.data.user;
          this.rated_movies = response.data.rated_movies;
        });
      }
    },
    showMoreInfo: function (movie) {
      this.current_movie = movie;
      this.$router.push("/movies/" + this.current_movie.id);
    },
  },
};
</script>

<template>
  <h1>{{ user.username }}'s Page</h1>

  <div class="index">
    <div class="card" v-for="movie in rated_movies" :key="movie.id">
      <img v-bind:src="movie['poster_path']" class="card-img-top" v-on:click="showMoreInfo(movie)" />
      <div class="card-body">
        <h5 class="card-title">{{ movie["title"] }}</h5>
        <p class="card-text" v-on:click="showUser(movie)">{{ user["username"] }}'s Score: {{ movie["rating"] }}</p>
        <p class="card-text" v-on:click="showUser(movie)">{{ user["username"] }}'s Review: {{ movie["message"] }}</p>
      </div>
    </div>
  </div>
</template>

<style></style>
