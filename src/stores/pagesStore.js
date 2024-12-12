import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { mainStore } from "./mainStore";
import axiosInstance from "./axios_instance";

export const usePageStore = defineStore("pageStore", {
  state: () => ({
    home: [],
    about: [],
    services: [],
    team_work: [],
    achievement: [],
    community: [],
    jobs: [],
    blogs: [],
    contact_us: [],
    terms: [],
    privacy: [],
  }),
  actions: {
    async getPageData(pageName) {
      let loading = true;
      await axiosInstance
        .get(`${mainStore().apiLink}/website/pages/${pageName}`)
        .then((res) => {
          this[pageName] = res.data.data;
        })
        .catch((err) => {
          let errorMessage = "Something went wrong, please try again";

          if (err.response && err.response.data && err.response.data.errors) {
            const errorArray = Object.values(err.response.data.errors);
            if (errorArray.length > 0 && errorArray[0][0]) {
              errorMessage = errorArray[0][0];
            }
          }
          mainStore().showAlert(errorMessage, 2);
        })
        .finally(() => {
          loading = false;
          return loading;
        });
    },
  },
});
