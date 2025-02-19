import { defineStore } from "pinia";
import { mainStore } from "./mainStore";
import axiosInstance from "./axios_instance";

export const useFilterStore = defineStore("filterStore", {
  state: () => ({
    filtered: [],
  }),
  actions: {
    async getFiltered(type, keyword, isParent) {
      let loading = true;
      await axiosInstance
        .get(
          `${
            mainStore().apiLink
          }/website/search?page_type=${type}&keyword=${keyword}&isParent=${
            isParent ?? true
          }`
        )
        .then((res) => {
          this.filtered = res.data.data;
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
