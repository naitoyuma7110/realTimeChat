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
    return

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
          disabled={true}
					onClick={handleRegister}
					className="w-full px-4 py-2 bg-gray-200 text-white rounded">
					Register
				</button>
      </div>
      <div className="py-2 flex-col flex gap-y-2 my-2">
        <div className="border p-4 rounded-lg">
          <p>サンプルユーザー1</p>
          <p>email: sample@sample.com</p>
          <p>password: sampleSample</p>
        </div>
        <div className="border p-4 rounded-lg">
          <p>サンプルユーザー2</p>
          <p>email: sample2@sample.com</p>
          <p>password: sample2Sample</p>
        </div>
      </div>
      <div className="text-gray-600 text-xs">
      <p>チャット連打しないでね(´ω｀)</p>
      <p>ユーザー登録は一時停止中</p>
      </div>
		</div>
	);
}
