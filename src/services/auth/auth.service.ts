import { ApiResponse } from "../../models/api-response";
import { retriveAxiosErrorResponse, retriveAxiosSuccessResponse } from "../http/axios-response.service";
import { HttpBaseService } from "../http/http-base.service";
import { server } from "../../server/server";

export class AuthService extends HttpBaseService {

    static classInstance: AuthService;
    static apiBaseUrl = `${server}/auth`;

    constructor() {
        super("", AuthService.apiBaseUrl);
    }

    static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new AuthService();
        }
        return this.classInstance;
    }

    async register(userRegisterDto: any) {
        let apiResponse = new ApiResponse();
        try {
            const res = await this.instance.post('/register', userRegisterDto);
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        } catch (err) {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        }
    }

    async login(userLoginDto: any) {
        let apiResponse = new ApiResponse();
        try {
            const res = await this.instance.post('/login', userLoginDto);
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        } catch (err) {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        }
    }

    async update(userUpdateDto: any, userId: string) {
        let apiResponse = new ApiResponse();
        try {
            const res = await this.instance.put('/update-user/' + userId, userUpdateDto);
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        } catch (err) {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        }
    }

    async signOut() {
        return new Promise((resolve) => {
            localStorage.clear();
            resolve(true);
        });
    }

    getConnectedUserFromLocalStorage(): Promise<any> {
        return new Promise((resolve) => {
            const user = localStorage.getItem("user");
            if (user?.length)
                resolve(JSON.parse(user));
            resolve(null);
        });
    }

    setConnectedUserToLocalStorage(user: any, token: string) {
        return new Promise((resolve) => {
            localStorage.setItem("user", JSON.stringify({ user, token }));
           // console.log("set user");
            resolve(true);
        });
    }
}