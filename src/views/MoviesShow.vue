<script>
import axios from "axios";
export default {
  data: function () {
    return {
      isLoggedIn: false,
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
      videos: [],
      trailers: [],
      background_image: {},
    };
  },
  created: function () {
    this.isLoggedIn = localStorage.user_id;
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
        this.videos = response.data["videos"];
        this.background_image = response.data["background_image"];
        this.isMovieStreaming();
        this.getTrailers();
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
    getTrailers: function () {
      var videos = this.videos;
      var trailers = [];
      var index = 0;
      while (index < videos.length) {
        var type = videos[index].type;
        if (type === "Trailer") {
          trailers.push(videos[index]);
        }
        index = index + 1;
      }
      console.log("Filtered Trailers:", trailers, trailers[0].key);
      this.trailers = trailers;
    },
  },
};
</script>

<template>
  <div class="row">
    <img class="background" :src="`https://image.tmdb.org/t/p/w1280${background_image.file_path}`" alt="" />
    <div class="col-md-4">
      <div class="movie-poster">
        <img :src="movie.poster_path" alt="" />
        <div class="stream" v-if="streaming === true">
          <p>Stream {{ movie.title }} now on {{ stream.flatrate[0]["provider_name"] }}</p>
        </div>
        <button
          v-if="isLoggedIn"
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Rate {{ movie.title }}
        </button>
      </div>
    </div>
    <div class="col-md-8">
      <div class="movie-info">
        <h3 class="title">{{ movie.title }}</h3>
        <h5 class="score">Viewer Score: {{ movie.vote_average }}</h5>
        <h5 class="release">Release Date: {{ movie.release_date }}</h5>
        <p class="about">{{ movie.overview }}</p>
        <div class="stream-image" v-if="streaming === true">
          <img :src="`https://image.tmdb.org/t/p/w1280${stream.flatrate[0].logo_path}`" alt="" />
        </div>
        <div class="no-stream" v-if="streaming === false">
          <p>Unfortunately {{ movie.title }} is not currently streamable.</p>
        </div>
      </div>
    </div>
  </div>

  <div v-if="trailers.length > 0">
    <div v-for="trailer in trailers" v-bind:key="trailer.id">
      <a :href="`https://www.themoviedb.org/video/play?key=${trailer.key}`">{{ movie.title }} {{ trailer.name }}</a>
      <video crossOrigin="anonymous" :key="`https://www.themoviedb.org/video/play?key=${trailer.key}`" controls>
        <source :src="`https://www.themoviedb.org/video/play?key=${trailer.key}`" type="video/mp4" />
      </video>
    </div>
  </div>
  <h3>Top Billed Cast</h3>
  <div class="cast-container">
    <div class="cast" v-for="actor in topBilledCast" v-bind:key="actor.id">
      <img :src="`https://image.tmdb.org/t/p/w1280${actor.profile_path}`" alt="" />
      <div class="cast-info">
        <h4>{{ actor["character"] }}</h4>
        <h5>{{ actor["name"] }}</h5>
      </div>
    </div>
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
.row {
  margin: 0;
  height: 50rem;
}
.background {
  pointer-events: none;
  position: absolute;
  left: 0;
  z-index: -1;
  opacity: 0.8;
  height: 50rem;
  object-fit: cover;
}
.movie-poster {
  padding: 3rem;
  margin: 3rem;
}
.movie-poster img {
  display: flex;
  height: 30rem;
  width: 20rem;
  border: black;
  border-width: 3rem;
  border-top-left-radius: 7.5px;
  border-top-right-radius: 7.5px;
  box-shadow: 0 7px 9px rgba(0, 0, 128, 0.2);
}

.movie-poster button {
  margin-top: 1rem;
  opacity: 1;
  width: 20rem;
}

.movie-info {
  padding: 3rem;
  margin: 3rem;
  margin-top: 6rem;
  background-color: ivory;
  opacity: 0.7;
  border: black;
  border-width: 3rem;
  border-radius: 7.5px;
  box-shadow: 0 7px 9px rgba(0, 0, 128, 0.2);
}

.stream {
  background-color: darkslategrey;
  opacity: 0.7;
  width: 20rem;
  color: ivory;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  text-align: center;
}
.stream-image img {
  max-height: 4rem;
  max-width: 4rem;
}

.cast-container {
  white-space: nowrap;
  margin: 3rem;
  width: 50%;
  background-color: lightsteelblue;
  box-shadow: 0 7px 9px rgba(0, 0, 128, 0.2);
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x proximity;
}

.cast {
  box-shadow: 0 4px 5px rgba(0, 0, 128, 0.2);
  outline: 5px;
  display: inline-block;
  position: relative;
  scroll-padding-left: 2.5rem;
  margin-left: 5rem;
  width: 7.5rem;
}

.cast img {
  scroll-snap-align: start;
  height: 12rem;
  width: 100%;
  object-fit: contain;
  display: inline;
}

.cast-info {
  scroll-snap-align: start;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: transparent;
  color: transparent;
  transform: translateY(100%);
  transition-delay: 0.6s;
  word-wrap: break-word;
}

.cast-info h4 {
  font-size: 100%;
  font-weight: bold;
}

.cast:hover .cast-info {
  transform: translateY(0%);
  background-color: ivory;
  color: black;
}
</style>
