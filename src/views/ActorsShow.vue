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
  // created: function () {
  //   this.isLoggedIn = localStorage.user_id;
  //   this.showMovie();
  // },
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
  },
};
</script>

<template>
  <div class="home">
    <h1>Actor: {{ this.name }}</h1>
  </div>
</template>

<style></style>
