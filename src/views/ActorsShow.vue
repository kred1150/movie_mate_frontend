<script>
import axios from "axios";
export default {
  data: function () {
    return {
      isLoggedIn: false,
      bio: [],
      birthday: [],
      deathday: [],
      name: [],
      birthplace: [],
      profile_path: [],
      cinemetography: [],
    };
  },
  created: function () {
    this.isLoggedIn = localStorage.user_id;
    this.showActor();
  },
  computed: {
    topActedMovies: function () {
      return this.cinemetography.slice(0, 20);
    },
  },
  methods: {
    showActor: function () {
      axios.get("/actors/" + this.$route.params.id).then((response) => {
        console.log("Show Actor", response);
        this.bio = response.data["bio"];
        this.birthday = response.data["birthday"];
        this.deathday = response.data["deathday"];
        this.name = response.data["name"];
        this.birthplace = response.data["birthplace"];
        this.profile_path = response.data["profile_path"];
        this.cinemetography = response.data["cinemetography"];
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
  <div class="home">
    <h1>Actor: {{ name }}</h1>
    <img class="profile_pic" :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${profile_path}`" alt="" />
    <p>{{ bio }}</p>
  </div>

  <div class="known-for">
    <h3>Cinemetography</h3>
    <div class="index">
      <TransitionGroup name="list">
        <div class="card" v-for="movie in topActedMovies" :key="movie.id">
          <img
            v-bind:src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`"
            class="card-img-top"
          />
          <!-- v-on:click="showMoreInfo(movie)"
          /> -->
          <div class="card-body">
            <!-- <h5 v-on:click="showMoreInfo(movie)">{{ movie.title }}</h5> -->
            <!-- <p :class="`${getRatingZone(movie.vote_average)}`">{{ movie.vote_average }}</p> -->
            <h4>{{ movie.title }}</h4>
            <p>{{ movie.character }}</p>
          </div>
          <div class="overview">
            <h4>{{ movie.title }}</h4>
            <p>{{ movie.overview }}</p>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
  <!-- 
    <div class="movies-container">
      <div class="card" v-for="movie in topActedMovies" v-bind:key="movie.id">
        {{ movie["title"] }}
        {{ movie["character"] }}
      </div>
      <p>{{ cinemetography }}</p>
    </div>
  </div> -->
</template>

<style></style>
