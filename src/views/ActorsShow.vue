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
      return this.cinemetography;
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
            <p :class="`${getRatingZone(movie.vote_average)}`">{{ movie.vote_average.toFixed(1) }}</p>
          </div>
          <div class="overview">
            <h4>{{ movie.character }}</h4>
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

<style>
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
