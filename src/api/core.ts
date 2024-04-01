import axios from "axios";

interface ApiElementParams {
  params?: any;
  queries?: any;
  data?: any;
}

const baseURL = "http://127.0.0.1:3000/api/v1";

// const baseURL = "http://103.30.10.141:3000/api/v1";

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

      // if (queries) {
      //   actualPath += "?";
      //   Object.keys(queries).forEach((key) => {
      //     actualPath += `${key}=${queries[key]}&`;
      //   });
      //   actualPath = actualPath.slice(0, -1);
      // }

      console.log(actualPath);
      return axios({
        method,
        baseURL: customBaseUrl ? customBaseUrl : baseURL,
        params: queries,
        url: actualPath,
        data: data,
      });
    },
  };
};
