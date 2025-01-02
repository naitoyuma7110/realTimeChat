"use client";

import { useState } from "react";
import { login, register } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const router = useRouter();

	const handleLogin = async () => {
		try {
			await login(email, password);
			router.push("/chat");
		} catch (error) {
			alert("Failed to login: " + error);
		}
	};

	const handleRegister = async () => {
		try {
			await register(email, password);
			await login(email, password);
			setEmail("");
			setPassword("");
			alert("Registered successfully!");
			router.push("/chat");
		} catch (error) {
			alert("Failed to register: " + error);
		}
	};

	return (
		<div className="max-w-sm mx-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">Login</h1>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="w-full p-2 mb-4 border rounded"
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="w-full p-2 mb-4 border rounded"
			/>
			<div className="flex gap-2">
				<button
					onClick={handleLogin}
					className="w-full px-4 py-2 bg-blue-500 text-white rounded">
					Login
				</button>
				<button
					onClick={handleRegister}
					className="w-full px-4 py-2 bg-gray-500 text-white rounded">
					Register
				</button>
			</div>
		</div>
	);
}
