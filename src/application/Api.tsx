import axios from "axios";
import AppHeaders from "./Headers";

export default axios.create({
    baseURL: process.env.BASE_URL,
    // headers: AppHeaders.buildHeaders()
});
