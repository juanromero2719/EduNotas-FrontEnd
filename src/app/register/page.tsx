"use client";

import { useState } from "react";
import useRegister from "./hooks/useRegister";

function RegisterPage() {

    const { register, isLoading, error, success, handleSubmit } = useRegister();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Register</h1>
            <form
                className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded-lg shadow-md"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;

