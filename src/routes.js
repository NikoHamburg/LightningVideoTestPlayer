import { Home } from "./pages/Home";

const routes = {
  root: "Home",
  routes: [
    {
      path: "Home",
      component: Home,
      widgets: ["Logger"],
    },
  ],
};

export { routes };
