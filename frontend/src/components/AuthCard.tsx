import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "http://localhost:3000/api/v1/users";

export default function AuthCard({ isSignin }: { isSignin: boolean }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const endpoint = isSignin ? `${BACKEND_URL}/signin` : `${BACKEND_URL}/signup`;

        try {
            const response = await axios.post(endpoint, {
                username,
                password
            });

            const token = response.data.token;

            if (token) {
                // Save token in localStorage
                localStorage.setItem("token", token);
                // Redirect to dashboard
                navigate("/dashboard");
            } else {
                setError(response.data.message || "Authentication failed");
            }
        } catch (err: any) {
            console.error("Auth error:", err);
            const serverMsg = err.response?.data?.message;
            setError(serverMsg || "Something went wrong. Please check your details.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
                {isSignin ? "Sign In" : "Sign Up"}
            </h2>

            {error && (
                <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Username</label>
                    <input 
                        type="text" 
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                        placeholder="Enter username (min 3 chars)"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500"
                        placeholder="•••••••• (min 8 chars)"
                    />
                </div>
                
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? "Processing..." : (isSignin ? "Sign In" : "Create Account")}
                </button>
            </form>

            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    {isSignin ? "Don't have an account?" : "Already have an account?"}
                    <Link 
                        to={isSignin ? "/signup" : "/signin"}
                        className="text-blue-600 hover:underline ml-1 font-semibold"
                    >
                        {isSignin ? "Sign up" : "Log in"}
                    </Link>
                </p>
            </div>
        </div>
    );
}
