import { createRouter, createWebHistory } from "vue-router";
import Calendar from "./pages/Calendar";
import DcHeros from "./pages/DcHeros";
import Home from "./pages/Home";
import Markdown from "./pages/Markdown";
import Slider from "./pages/Slider";
import Calculator from "./pages/Calculator";
import Modal from "./pages/ReuseableModal";

const routes = [
  { path: "/", component: Home },
  { path: "/calendar", component: Calendar },
  { path: "/heros", component: DcHeros },
  { path: "/markdown", component: Markdown },
  { path: "/slider", component: Slider },
  { path: "/calculator", component: Calculator },
  { path: "/modal", component: Modal },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
