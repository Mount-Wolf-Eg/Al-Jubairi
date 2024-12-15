import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        title: "Al Jubairi",
      },
    },
    {
      path: "/about",
      name: "About",
      component: () => import("@/views/AboutUs.vue"),
      meta: {
        title: "About Us",
      },
    },
    {
      path: "/services",
      name: "Services",
      component: () => import("@/views/ServicesPage.vue"),
      meta: {
        title: "Services",
      },
    },
    {
      path: "/our-team",
      name: "Team",
      component: () => import("@/views/OurTeam.vue"),
      meta: {
        title: "Team",
      },
    },
    // {
    //   path: "/nested",
    //   name: "Nested",
    //   component: () => import(""),
    //   children: [
    //     {
    //       path: "child1",
    //       name: "Child1",
    //       component: () => import(""),
    //     },
    //   ],
    // },
    {
      path: "/:pathMatch(.*)*",
      name: "Not-found",
      component: () => import("../components/global/helpers/NotFound.vue"),
      meta: {
        title: "Not Found",
      },
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  },
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
