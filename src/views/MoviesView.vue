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

  <div class="movie-cards">
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <TransitionGroup name="list">
        <div class="col" v-for="movie in filteredMovies()" :key="movie.id">
          <img v-bind:src="movie.poster_path" class="card-img-top" v-on:click="showMoreInfo(movie)" />
          <div class="card-body">
            <h5 class="card-title" v-on:click="showMoreInfo(movie)">{{ movie.title }}</h5>
            <p class="card-text">Average Viewer Score: {{ movie.vote_average }}</p>
          </div>
        </div>
      </TransitionGroup>
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
