import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance from "@/services/axiosInstance";

interface LoginResponse {
    token: string;
    expiresIn: string;
}

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            // definir las credenciales que se van a usar
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {

                console.log("credentials", credentials);
                // validar las credenciales
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error("Email and password are required.");
                }

                try {
                    console.log("axiosInstance");
                    const response = await axiosInstance.post("api/users/login", {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    console.log("response", response);

                    const user = response.data;

                    console.log("user", user);

                    if (!user) {
                        throw new Error("Invalid credentials.");
                    }

                    return {
                        id: user.token,
                        ...user
                    };
                } catch (error: any) {
                    console.log("error", error);
                    console.error("Error in authorize:", error?.response?.data || error.message);
                    throw new Error(error?.response?.data?.message || "Login failed.");
                }
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        session({ session, token }) {
            // cambiar este tipo any
            session.user = token.user as any;
            return session;
        }
    },
    pages: {
        signIn: "/login",
    }
})

export { handler as GET, handler as POST }