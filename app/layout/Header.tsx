"use client";
import Link from "next/link";
import { useAuth } from "@/app/feature/auth/context/auth-context";
import { logout } from "@/lib/firebase/auth";

const Header = () => {
	const { user } = useAuth();

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
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
	);
};

export default Header;
