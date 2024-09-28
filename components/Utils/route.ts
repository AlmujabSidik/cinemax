import Homepage from "../Pages/Homepage/homepage.js";
import Detail from "../Pages/Detail/index.js";
import About from "../Pages/About/index.js";
const ROUTES: { [key: string]: HTMLElement } = {
  home: new Homepage().render(),
  detail: new Detail().render(),
  about: new About().render(),
};
const route = (hash: string) => {
  const appContainer = document.getElementById("app") as HTMLElement;
  appContainer.innerHTML = "";

  const hashRoute = hash === "" ? "home" : hash.split("?")[0];

  switch (hashRoute) {
    case "home":
      appContainer.appendChild(ROUTES.home);
      break;
    case "detail":
      appContainer.appendChild(ROUTES.detail);
      break;
    case "about":
      appContainer.appendChild(ROUTES.about);
      break;
    default:
      alert("page not found");
  }
};

export default route;
