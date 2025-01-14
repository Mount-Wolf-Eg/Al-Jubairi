import { defineStore } from "pinia";
import axiosInstance from "./axios_instance";
import { mainStore } from "./mainStore";

export const useInsightsStore = defineStore("insightsStore", {
  state: () => ({
    loading: false,
    error: null,
  }),
  actions: {
    async sendRoute(path) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axiosInstance.post(
          `${mainStore().apiLink}/general/log-api`,
          { front_route: path }
        );
        // return response.data;
      } catch (err) {
        this.error = "Something went wrong, please try again";
        if (err.response && err.response.data && err.response.data.errors) {
          const errorArray = Object.values(err.response.data.errors);
          if (errorArray.length > 0 && errorArray[0][0]) {
            this.error = errorArray[0][0];
          }
        }
        mainStore().showAlert(this.error, 2);
      } finally {
        this.loading = false;
      }
    },
  },
});
