<script>
import axios from "axios";

export default {
  data: function () {
    return {
      movies: [],
      current_movie: {},
      titleFilter: "",
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
    filteredMovies: function () {
      return this.movies.filter((movie) => {
        return movie.title.toLowerCase().includes(this.titleFilter.toLowerCase());
      });
    },
    sortedMovies: function () {
      return this.movies.sort((a, b) => (a.last_nom > b.last_nom ? 1 : b.last_nom > a.last_nom ? -1 : 0));
    },
    getRatingZone: function (score) {
      if (score >= 7.5) {
        return "green";
      } else if (score >= 6.0) {
        return "yellow";
      } else {
        return "red";
      }
    },
  },
};
</script>

<template>
  <div class="search_bar">
    Search for a Movie:
    <input v-model="titleFilter" type="text" list="titles" />
    <datalist id="titles">
      <option v-for="movie in sortedMovies()" v-bind:key="movie.id">
        {{ movie.title }}
      </option>
    </datalist>
  </div>

  <div class="index">
    <TransitionGroup name="list">
      <div class="card" v-for="movie in filteredMovies()" :key="movie.id">
        <img v-bind:src="movie.poster_path" class="card-img-top" v-on:click="showMoreInfo(movie)" />
        <div class="card-body">
          <h5 v-on:click="showMoreInfo(movie)">{{ movie.title }}</h5>
          <p :class="`${getRatingZone(movie.vote_average)}`">{{ movie.vote_average }}</p>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style>
.index {
  display: flex;
  flex-wrap: wrap;
}
.card {
  box-shadow: 0 4px 5px rgba(0, 0, 128, 0.2);
  width: 18rem;
  display: flex;
  margin: 1rem;
}

.card img {
  max-width: 100%;
  object-fit: cover;
  display: inline-block;
}

.card-body {
  background-color: lightskyblue;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem 1rem;
  letter-spacing: 1px;
  align-items: center;
}

.card-body h5 {
  margin: 0;
  color: black;
  font-weight: bold;
  text-shadow: 2px 2px 5px slategrey;
}
.card-body p {
  background-color: midnightblue;
  color: dimgray;
  border-radius: 3px;
  padding: 0.25rem 0.5rem;
  align-items: center;
}
.card-body p.green {
  color: lime;
}
.card-body p.yellow {
  color: yellow;
}
.card-body p {
  color: red;
}

.search_bar {
  margin: 2rem;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.2s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
