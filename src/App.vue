<script>
export default {
  data: function () {
    return {
      isLoggedIn: false,
      flashMessage: null,
      searchText: "",
    };
  },
  watch: {
    $route: function () {
      console.log("Route has changed!");
      this.isLoggedIn = localStorage.jwt;
      this.flashMessage = localStorage.flashMessage;
    },
  },
  methods: {
    resetFlash: function () {
      localStorage.removeItem("flashMessage");
      this.flashMessage = "";
    },
    searchBar: function () {
      this.$router.push({
        searchText: this.searchText,
      });
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <img
        src="https://toppng.com/uploads/preview/film-cinema-illustration-popcorn-and-projector-movie-11562911119ni7qtdkdp4.png"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt=""
      />
      <a class="navbar-brand" href="/">MovieM8</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon">MovieM8</span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/movies">All Movies</a>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDarkDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Your Profile
            </a>
            <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
              <li v-if="!isLoggedIn"><a class="dropdown-item" href="/signup">Sign Up</a></li>
              <li v-if="!isLoggedIn"><a class="dropdown-item" href="/login">Log In</a></li>
              <li v-if="isLoggedIn"><a class="dropdown-item" href="/logout">Log Out</a></li>
              <li v-if="isLoggedIn"><a class="dropdown-item" href="/profile">Your Profile Page</a></li>
            </ul>
          </li>
        </ul>
        <form class="d-flex">
          <input
            v-model="searchText"
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button v-on:click="searchBar()" class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
  <div class="container">
    <div v-if="flashMessage" class="alert alert-success" role="alert" v-on:click="resetFlash()">
      {{ flashMessage }}
    </div>
    <router-view />
  </div>
</template>

<style>
nav {
  position: fixed;
  padding: 5rem;
  margin: 1rem;
}
</style>
