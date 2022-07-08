<script>
import axios from "axios";
export default {
  data: function () {
    return {
      movie: {},
      newScoreParams: {
        user_id: "",
        movie_id: "",
        rating: "",
        message: "",
      },
      stream: {
        flatrate: [],
      },
      streaming: false,
      cast: [],
    };
  },
  created: function () {
    this.showMovie();
  },
  computed: {
    topBilledCast: function () {
      return this.cast.slice(0, 10);
    },
  },
  methods: {
    showMovie: function () {
      axios.get("/movies/" + this.$route.params.id).then((response) => {
        console.log("Show Movie", response);
        this.movie = response.data["movie"];
        this.stream = response.data["stream"];
        this.cast = response.data["cast"];
        this.isMovieStreaming();
      });
    },
    scoreMovie: function (movie) {
      this.newScoreParams.movie_id = movie.id;
      console.log(movie, "You scored this movie:", this.newScoreParams.rating);
      axios.post("/rated_movies", this.newScoreParams).then((response) => {
        console.log(response, "Movie Rated!");
        localStorage.setItem("flashMessage", "Thank you for Rating!");
        this.$router.push("/movies");
      });
    },
    isMovieStreaming: function () {
      if (this.stream && this.stream["flatrate"] && this.stream["flatrate"].length > 0) {
        this.streaming = true;
      }
    },
  },
};
</script>

<template>
  <img class="show_poster" :src="movie.poster_path" alt="" />

  <h3>{{ movie.title }}</h3>
  <h5>Viewer Score: {{ movie.vote_average }} Release Date: {{ movie.release_date }}</h5>
  <p>{{ movie.overview }}</p>

  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Rate {{ movie.title }}
  </button>

  <div class="stream" v-if="streaming === true">
    <p>
      Stream {{ movie.title }} now on {{ stream.flatrate[0]["provider_name"] }}
      <img :src="`https://image.tmdb.org/t/p/w1280${stream.flatrate[0].logo_path}`" alt="" />
    </p>
  </div>
  <div v-if="streaming === false">
    <p>Unfortunately {{ movie.title }} is not currently streamable.</p>
  </div>

  <div class="cast" v-for="actor in topBilledCast" v-bind:key="actor.id">
    <img :src="`https://image.tmdb.org/t/p/w1280${actor.profile_path}`" alt="" />
    <h4>{{ actor["character"] }}</h4>
    <h5>{{ actor["name"] }}</h5>
  </div>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">What do you rate {{ movie.title }}?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Your Score:
          <input v-model="newScoreParams.rating" type="text" />
        </div>
        <div class="modal-body">
          Your Review:
          <input v-model="newScoreParams.message" type="text" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button v-on:click="scoreMovie(movie)" type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.show_poster {
  align: left;
  height: 30rem;
  width: 20rem;
  border: black;
  border-width: 3rem;
}
.stream img {
  max-height: 2rem;
  max-width: 2rem;
}
</style>
