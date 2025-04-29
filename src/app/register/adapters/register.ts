import axiosInstance from "@/services/axiosInstance";

interface RegisterPayload {
    email: string;
    firstName: string;
    secondName: string;
    firstLastName: string;
    secondLastName: string;
    password: string;
}

interface RegisterResponse {
    userId: number;
    firstName: string;
    secondName: string;
    firstLastName: string;
    secondLastName: string;
    email: string;
}

export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
    try {
        const response = await axiosInstance.post<RegisterResponse>("/api/users/register", payload);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            // El servidor respondió con un status fuera del rango 2xx
            throw new Error(error.response.data?.message || "Login failed");
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            throw new Error("No response from server");
        } else {
            // Algo pasó al preparar la solicitud
            throw new Error("Error during login request");
        }
    }
};
