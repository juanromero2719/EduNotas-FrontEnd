import axiosInstance from "@/services/axiosInstance";

interface LoginPayload {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

export const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post<LoginResponse>("api/users/login", payload);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data?.message || "Login failed");
    }
};
