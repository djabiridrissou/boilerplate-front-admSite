

export const retriveAxiosSuccessResponse = (res: any) => {
    return {
        status: res.status,
        message: res.data.message,
        data: res.data.data,
        totalPages: res.data.totalPages,
        success: res.data.success,
        error: res.data.error,
        token: res.data.token
    }
};

export const retriveAxiosErrorResponse = (res: any) => {
    if (res.status == 401) {
        location.href = "/";
    }
    return {
        status: res.response.status,
        message: res.response.message,
        data: res.response.data,
        success: res.response.success,
        error: res.response.error
    }
};