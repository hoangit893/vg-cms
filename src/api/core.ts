import axios from "axios";

interface ApiElementParams {
  params?: any;
  queries?: any;
  data?: any;
}

export const apiElement = (
  method: string,
  path: string,
  customBaseUrl: string = ""
) => {
  return {
    invoke: ({ params, queries, data }: ApiElementParams) => {
      const token = localStorage.getItem("AccessToken") ?? "";
      axios.defaults.headers.Authorization = `${token}`;
      let actualPath = path;
      if (params) {
        Object.keys(params).forEach((key) => {
          actualPath += `/${params[key]}`;
        });
      }
      console.log("actualPath", actualPath);
      return axios({
        method,
        baseURL: customBaseUrl ? customBaseUrl : import.meta.env.VITE_BASE_URL,
        params: queries,
        url: actualPath,
        data: data,
      });
    },
  };
};
