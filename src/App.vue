<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="/">
      <img
        src="https://toppng.com/uploads/preview/film-cinema-illustration-popcorn-and-projector-movie-11562911119ni7qtdkdp4.png"
        width="30"
        height="30"
        class="d-inline-block align-top"
        alt=""
      />
      MovieM8
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavDropdown"
      aria-controls="navbarNavDropdown"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/movies">Movies</a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            id="navbarDropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Profile
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="/signup">Sign Up</a>
            <a class="dropdown-item" href="/login">Log In</a>
            <a class="dropdown-item" href="/logout">Log Out</a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
  <router-view />
</template>

<style>
nav {
  padding: 5rem;
  margin: 1rem;
}
img {
  margin-left: 2rem;
  margin-right: 2rem;
}
</style>
