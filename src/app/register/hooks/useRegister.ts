import { useState } from "react";

const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const register = async (name: string, email: string, password: string) => {

        try {
            setIsLoading(true);
            setError(null);
            setSuccess(null);

            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log("Usuario registrado:", { name, email, password });
            setSuccess("Registro exitoso.");
        } catch (err) {
            setError("Hubo un error en el registro.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name")?.toString() || "";
        const email = formData.get("email")?.toString() || "";
        const password = formData.get("password")?.toString() || "";

        if (!name || !email || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        register(name, email, password);
    };

    return { register, isLoading, error, success, handleSubmit };
};

export default useRegister;
