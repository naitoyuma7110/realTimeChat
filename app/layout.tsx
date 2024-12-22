"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { observeAuthState } from "@/lib/firebase/authState";
import { logout } from "@/lib/firebase/auth";
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		const unsubscribe = observeAuthState((currentUser) => {
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	const handleLogout = async () => {
		try {
			await logout();
			setUser(null);
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};
	return (
		<html lang="en">
			<body>
				{/* レイアウトの共通部分 */}
				<header className="flex justify-between items-center p-4 bg-gray-200">
					<Link href="/chat" className="text-xl font-bold">
						<button>Chat App</button>
					</Link>
					<nav>
						{!user ? (
							<Link href="/login">
								<button className="px-4 py-2 bg-blue-500 text-white rounded">
									Login
								</button>
							</Link>
						) : (
							<div className="flex items-center gap-2">
								<span className="text-gray-700">Welcome, {user.email}</span>
								<button
									onClick={handleLogout}
									className="px-4 py-2 bg-red-500 text-white rounded">
									Logout
								</button>
							</div>
						)}
					</nav>
				</header>

				{/* 子コンポーネントをレンダリング */}
				<main className="p-4">{children}</main>
			</body>
		</html>
	);
}
