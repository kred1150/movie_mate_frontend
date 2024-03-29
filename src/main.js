import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Darkmode from "darkmode-js";

new Darkmode().showWidget();
// import Vue from "vue";
// import Embed from "v-video-embed";

// Vue.use(Embed);

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://serene-dusk-88140.herokuapp.com";

createApp(App).use(router).mount("#app");

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
}
