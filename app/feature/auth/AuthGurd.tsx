import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/app/feature/auth/context/auth-context";
import { useRouter } from "next/navigation";

const AuthGuard: React.FC<{ children: ReactNode }> = ({ children }) => {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!user) {
			router.push("/login");
		}
	}, [user, router]);

	if (loading) return <p>Loading...</p>;

	return <>{user && children}</>;
};

export default AuthGuard;
