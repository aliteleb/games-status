import axios from "axios";

export default axios.create({
    baseURL: "https://games-status.test/api",
    withCredentials: true,
})