import axios from "axios";

const url = "http://localhost:3001";

const api = axios.create({
    baseURL: url,
    auth: {
        username: "99coders",
        password: "112233"
    }
});

export default api;