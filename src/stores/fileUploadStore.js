import { defineStore } from "pinia";
import axiosInstance from "./axios_instance";
import { mainStore } from "./mainStore";

export const useFileUploadStore = defineStore("fileUploadStore", {
  state: () => ({
    loading: false,
    error: null,
  }),
  actions: {
    async uploadFile(formData) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axiosInstance.post(
          `${mainStore().apiLink}/general/attachments`,
          formData
        );
        return response.data; // Return the response data if needed
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
