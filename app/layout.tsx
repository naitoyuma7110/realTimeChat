"use client";
import "./globals.css";
import { AuthProvider } from "@/app/feature/auth/context/auth-context";
import Header from "./layout/Header";
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ja">
			<AuthProvider>
				<body>
					<Header />
					<main className="p-4">{children}</main>
				</body>
			</AuthProvider>
		</html>
	);
}
