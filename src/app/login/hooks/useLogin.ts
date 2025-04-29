import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const useLogin = () => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const login = async (email: string, password: string) => {

        console.log("email", email);
        console.log("password", password);

        try {

            setIsLoading(true);
            setError(null);
            setSuccess(null);

            console.log("signIn");

            const loginResponse = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            console.log("loginResponse", loginResponse);

            if (loginResponse?.error) {
                setError(loginResponse.error);
                return;
            }

            if (loginResponse?.ok) return router.push("/");

        } catch (err) {
            console.log("err", err);
            setError("Hubo un error en el registro.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email")?.toString() || "";
        const password = formData.get("password")?.toString() || "";

        if (!email || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        login(email, password);
    };

    return { isLoading, error, success, handleSubmit };
};

export default useLogin;
