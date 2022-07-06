<script>
import axios from "axios";
export default {
  data: function () {
    return {
      movie: {},
      newScoreParams: {
        // user_id: this.current_user["id"],
        // movie_id: this.movie["id"],
        rating: " ",
        message: " ",
      },
    };
  },
  created: function () {
    this.showMovie();
  },
  methods: {
    showMovie: function () {
      axios.get("/movies/" + this.$route.params.id).then((response) => {
        console.log("Show Movie", response);
        this.movie = response.data;
      });
    },
    scoreMovie: function (movie) {
      console.log(movie, "You scored this movie:", this.newScoreParams.rating);
      axios.post("/rated_movies", this.newScoreParams).then((response) => {
        console.log(response, "Movie Rated!");
      });
      this.$router.push("/movies");
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
</style>
