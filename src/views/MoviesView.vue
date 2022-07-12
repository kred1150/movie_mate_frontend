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
    <input v-model="titleFilter" type="text" list="titles" placeholder="Search Movie" />
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
        <div class="overview">
          <h4>{{ movie.title }}</h4>
          <p>{{ movie.overview }}</p>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.search_bar {
  justify-content: flex-start;
  padding: 10px;
  position: sticky;
  top: 2rem;
  z-index: 2;
}

.search_bar input {
  background-color: lightskyblue;
  border: 5px solid slategrey;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.search_bar:focus {
  background-color: navy;
  outline: navy;
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

.overview {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: transparent;
  color: transparent;
  padding: 2rem;
  transform: translateY(100%);
  transition-delay: 0.6s;
}

.card:hover .overview {
  transform: translateY(0%);
  background-color: ivory;
  color: black;
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
