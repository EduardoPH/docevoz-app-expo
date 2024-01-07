import axios from "axios";

export default axios.create({
  baseURL: "http://34.225.184.75/api/private",
  timeout: 10000,
  responseType: "json",
  responseEncoding: "utf8",
});
