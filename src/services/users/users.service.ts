import { ApiResponse } from "../../models/api-response";
import { retriveAxiosErrorResponse, retriveAxiosSuccessResponse } from "../http/axios-response.service";
import { HttpBaseService } from "../http/http-base.service";
import { server } from "../../server/server";

export class UserService extends HttpBaseService {

    static classInstance: UserService;
    static apiBaseUrl = `${server}/auth`;

    constructor() {
        super("", UserService.apiBaseUrl);
    }

    static getInstance() {
        if (!this.classInstance) {
            this.classInstance = new UserService();
        }
        return this.classInstance;
    }

    async getUsers(page: number, limit: number, searchTerm: string) {
        let apiResponse = new ApiResponse();
        try {
            const res = await this.instance.get(`/users?page=${page}&limit=${limit}&search=${searchTerm}`);
            apiResponse = retriveAxiosSuccessResponse(res);
            return apiResponse;
        } catch (err) {
            apiResponse = retriveAxiosErrorResponse(err);
            return apiResponse;
        }
    }
}