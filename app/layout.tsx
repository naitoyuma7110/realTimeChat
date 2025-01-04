"use client";
import "./globals.css";

import { Providers } from "@/app/providers";
import { AuthProvider } from "@/app/feature/auth/context/auth-context";

import Header from "./layout/Header";
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<AuthProvider>
						<Header />
						<main>{children}</main>
					</AuthProvider>
				</Providers>
			</body>
		</html>
	);
}
