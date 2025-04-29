import axios from "axios";

const baseURL = "https://edunotas-back-gyf2gdfkcba7dbhk.canadacentral-01.azurewebsites.net/";
console.log("baseURL", baseURL);

const axiosInstance = axios.create({
    baseURL: baseURL,
});

export default axiosInstance;
