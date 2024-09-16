import axios from "axios";

// <===== BaseURL cho API =====> //
const instance = axios.create({
    baseURL: "https://umeacademy.online/api/v1/",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 5000
})

export default instance