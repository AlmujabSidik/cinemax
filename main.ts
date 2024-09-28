import "./style.css";
import Route from "./components/Utils/route.js";

const handleHash = () => {
  const hash = window.location.hash.substring(1);
  Route(hash);
};

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash === "") {
    history.replaceState(null, "", "#");
  }

  handleHash();
});

window.addEventListener("hashchange", handleHash);
