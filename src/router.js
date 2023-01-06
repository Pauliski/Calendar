import { createRouter, createWebHistory } from "vue-router";
import Calendar from "./pages/Calendar";
import DcHeros from "./pages/DcHeros";
import Home from "./pages/Home";

const routes = [
  { path: "/", component: Home },
  { path: "/calendar", component: Calendar },
  { path: "/heros", component: DcHeros },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
