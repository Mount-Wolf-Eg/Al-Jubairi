import { createRouter, createWebHistory } from "vue-router";
import { useInsightsStore } from "@/stores/insightsStore";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        title: "AL Jubairi Law Firm - شركة الجبيري للمحاماة",
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
      path: "/services/service/:id",
      name: "serviceData",
      component: () =>
        import("@/components/locale/service-component/ServiceData.vue"),
      meta: {
        title: "Service Data",
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
    {
      path: "/employee-data/:id",
      name: "Employee",
      component: () =>
        import("@/components/locale/team-component/employee.vue"),
      meta: {
        title: "Employee",
      },
    },
    {
      path: "/achievement",
      name: "Achievement",
      component: () => import("@/views/Achievements.vue"),
      meta: {
        title: "Achievement",
      },
    },
    {
      path: "/community",
      name: "Community",
      component: () => import("@/views/community/Community.vue"),
      meta: {
        title: "Community",
      },
    },
    {
      path: "/contact",
      name: "Contact",
      component: () => import("@/views/contact/Contact.vue"),
      meta: {
        title: "Contact",
      },
    },
    {
      path: "/employment",
      name: "Employment",
      component: () => import("@/views/Employment.vue"),
      meta: {
        title: "Employment",
      },
    },
    {
      path: "/achievement/case/:id",
      name: "AchieveData",
      component: () =>
        import("@/components/locale/achievement-compnent/AchieveData.vue"),
      meta: {
        title: "Achieve Data",
      },
    },
    {
      path: "/blogs",
      name: "Blogs",
      component: () => import("@/views/Blog.vue"),
      meta: {
        title: "Blogs",
      },
    },
    {
      // path: "/blog-data/:id",
      path: "/:blogName/:id",
      name: "BlogDetail",
      component: () =>
        import("@/components/locale/blog-component/blogInfo.vue"),
      meta: {
        title: "Blog",
      },
    },
    {
      path: "/all-questions",
      name: "Questions",
      component: () =>
        import("@/components/locale/questions-component/AllQuestions.vue"),
      meta: {
        title: "Questions",
      },
    },
    {
      path: "/terms-conditions",
      name: "Terms",
      component: () => import("@/views/TermsConditions.vue"),
      meta: {
        title: "Terms-Conditions",
      },
    },
    {
      path: "/privacy-policy",
      name: "Privacy",
      component: () => import("@/views/PrivacyPolicy.vue"),
      meta: {
        title: "Privacy-Policy",
      },
    },
    {
      path: "/suggestions-complaints",
      name: "Suggestions",
      component: () => import("@/views/suggestions/Suggestions.vue"),
      meta: {
        title: "Suggestions And Complaints",
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
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title;
  next();
  if (to.name != "Not-found") {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then(async (data) => {
        await useInsightsStore().sendRoute(
          decodeURIComponent(to.path),
          data.ip
        );
      })
      .catch((error) => {
        console.error("Error fetching IP address:", error);
      });
  }
});

export default router;
