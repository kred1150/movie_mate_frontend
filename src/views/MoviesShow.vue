<script>
import axios from "axios";
export default {
  data: function () {
    return {
      movie: {},
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
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ movie }}</h1>
  </div>
</template>

<style></style>
