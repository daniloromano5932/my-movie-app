import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 1000,
  params: {
    api_key: process.env.REACT_APP_API_KEY
  },
});

export default instance