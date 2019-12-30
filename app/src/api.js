import axios from "axios";
import { loadState } from "./localStorage";
const API_ENDPOINT = "http://localhost:8081";

var axios_instance = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 1000
});

const execute = (method, url, data) => {
  let obj = {
    method,
    url,
    data,
    headers: {
      "x-access-token": loadState() ? loadState().user.token : ""
    }
  };
  if (method === "get" && data) {
    obj = { ...obj, params: data };
  }
  console.log("obj", obj);
  return axios_instance()
    .then(res => {
      //   console.log("data", res.data);
      return res.data;
    })
    .catch(e => {
      return Promise.reject(e);
    });
};

let obj = {
  get(URL, query) {
    // console.log("endpoint", endpoint);
    return execute("get", URL, query);
  },
  post(URL, data) {
    return execute("post", URL, data);
  }
};
export default obj;
