<script>
import axios from "axios";

export default {
  data: function () {
    return {
      rated_movies: [],
      current_movie: {},
      isLoggedIn: false,
    };
  },
  created: function () {
    this.userLoggedIn();
    this.routeIfNotLoggedIn();
    this.indexRatedMovies();
  },
  methods: {
    userLoggedIn: function () {
      if (localStorage.getItem("jwt") !== null) {
        this.isLoggedIn = true;
      }
    },
    routeIfNotLoggedIn: function () {
      if (this.isLoggedIn === false) {
        this.$router.push("/movies");
      }
    },
    indexRatedMovies: function () {
      axios.get("/rated_movies.json").then((response) => {
        console.log("Index Movies", response);
        this.rated_movies = response.data;
      });
    },
    showMoreInfo: function (movie) {
      this.current_movie = movie;
      console.log("Movie ID:", movie);
      this.$router.push("/users/" + movie["user"]["user_id"]);
    },
    showUser: function (movie) {
      this.current_movie = movie;
      console.log("Movie ID:", movie);
      this.$router.push("/users/" + movie["user"]["user_id"]);
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
  <h3>Your Friends Review's</h3>
  <div class="index">
    <div class="card" v-for="movie in rated_movies" :key="movie.id">
      <img v-bind:src="movie['movie']['poster_path']" class="card-img-top" v-on:click="showMoreInfo(movie)" />
      <div class="rated-body">
        <h5 class="rated-title">{{ movie["movie"]["title"] }}</h5>
        <p :class="`${getRatingZone(movie['rating']['rating'])}`" v-on:click="showUser(movie)">
          {{ movie["rating"]["rating"] }}
        </p>
      </div>
      <div class="rated-text">
        <p :class="`${getRatingZone(movie['rating']['rating'])}`" v-on:click="showUser(movie)">
          {{ movie["user"]["username"] }}'s Review: {{ movie["rating"]["message"] }}
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.rated-body {
  background-color: lightskyblue;
  display: flex;
  padding: 0.5rem 1rem 1rem;
  letter-spacing: 1px;
  align-items: center;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  justify-content: space-between;
}

.rated-title {
  text-align: center;
  outline: black 3px;
  color: black;
  font-weight: bold;
  text-shadow: 2px 2px 5px slategrey;
  height: 3rem;
}

.rated-body p {
  background-color: midnightblue;
  color: dimgray;
  border-radius: 3px;
  padding: 0.5rem 0.5rem;
}
.rated-body p.green {
  color: lime;
}
.rated-body p.yellow {
  color: yellow;
}
.rated-body p {
  color: red;
}

.rated-text {
  opacity: 0.8;
  overflow-y: auto;
  height: 7rem;
}

.rated-text:hover {
  opacity: 1;
}

.rated-text p {
  color: black;
  font-weight: bold;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 0.25rem 0.25rem;
}

.rated-text p.green {
  background-color: forestgreen;
}
.rated-text p.yellow {
  background-color: gold;
  color: slategrey;
}
.rated-text p {
  background-color: indianred;
}
</style>
