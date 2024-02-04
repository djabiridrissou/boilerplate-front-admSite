import axios from "axios";

export class HttpBaseService {
    instance;
    token;
    baseUrl;

    constructor(token: string, baseUrl: string) {
        this.baseUrl = baseUrl;
        this.instance = axios.create({
            baseURL: baseUrl,
        });
        this.token = token;
        this.initializeRequestInterceptor();
    }

    initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use(this.handleRequest);
    };

    handleRequest = (config: any) => {
        const userDataString = localStorage.getItem("user");
        const userData = userDataString ? JSON.parse(userDataString) : null;
        if (userData) {
            config.headers["Access-Control-Allow-Origin"] = "*";
            config.headers["Accept"] = "application/json";
            config.headers["Authorization"] = `Bearer ${userData.token}`;
        }
        return config;
    };

}