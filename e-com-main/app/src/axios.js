import axios from "axios";

const API_URL = "http://localhost:8000/";

axios.defaults.baseURL = API_URL;

export default axios;
