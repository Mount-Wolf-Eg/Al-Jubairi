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
    suggestions: [],
    singleItem: [],
    singleSec: [],
    allItemsData: [],
    pagination: [],
    childPagination: [],
    parentItems: [],
    childItems: [],
  }),
  actions: {
    async getPageData(pageName, num) {
      let loading = true;
      await axiosInstance
        .get(
          `${mainStore().apiLink}/website/pages/${pageName}?sections_page=${
            num ? num : 1
          }`
        )
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
    async getItemData(itemId) {
      let loading = true;
      await axiosInstance
        .get(`${mainStore().apiLink}/website/items/${itemId}`)
        .then((res) => {
          this.singleItem = res.data.data;
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
    async getSecData(secName) {
      let loading = true;
      await axiosInstance
        .get(`${mainStore().apiLink}/website/sections/${secName}`)
        .then((res) => {
          this.singleSec = res.data.data;
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
    async getAllItems(secName, num) {
      let loading = true;

      await axiosInstance
        .get(
          `${mainStore().apiLink}/website/sections/${
            secName ?? ""
          }?items_page=${num ?? 1}`
        )
        .then((res) => {
          this.allItemsData = res.data.data.items.data || [];
          this.pagination = res.data.data.items.pagination;
        })
        .catch((err) => {
          console.log(err);
          let errorMessage = "Something went wrong, please try again";
          if (err.response && err.response.data && err.response.data.message) {
            const errorArray = err.response.data.message;
            if (errorArray) {
              errorMessage = err.response.data.message;
            }
          } else {
            errorMessage = err.message;
          }
          mainStore().showAlert(errorMessage, 2);
        })
        .finally(() => {
          loading = false;
          return loading;
        });
    },
    async getChildItems(sec, num) {
      let loading = true;

      await axiosInstance
        .get(
          `${
            mainStore().apiLink
          }/website/sections/${sec}/child-items?items_page=${num ?? 1}`
        )
        .then((res) => {
          this.childItems = res.data.data;
          this.childPagination = res.data.pagination;
        })
        .catch((err) => {
          console.log(err);
          let errorMessage = "Something went wrong, please try again";
          if (err.response && err.response.data && err.response.data.message) {
            const errorArray = err.response.data.message;
            if (errorArray) {
              errorMessage = err.response.data.message;
            }
          } else {
            errorMessage = err.message;
          }
          mainStore().showAlert(errorMessage, 2);
        })
        .finally(() => {
          loading = false;
          return loading;
        });
    },
    async getParentItems(sec) {
      let loading = true;

      await axiosInstance
        .get(`${mainStore().apiLink}/website/sections/${sec}/parent-items`)
        .then((res) => {
          this.parentItems = res.data.data;
          this.pagination = res.data.data.pagination;
        })
        .catch((err) => {
          console.log(err);
          let errorMessage = "Something went wrong, please try again";
          if (err.response && err.response.data && err.response.data.message) {
            const errorArray = err.response.data.message;
            if (errorArray) {
              errorMessage = err.response.data.message;
            }
          } else {
            errorMessage = err.message;
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
