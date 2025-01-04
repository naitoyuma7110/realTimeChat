import Link from "next/link";
import { useAuth } from "@/app/feature/auth/context/auth-context";
import { logout } from "@/lib/firebase/auth";
import { Button, Avatar, Spinner, Stack } from "@chakra-ui/react";

const Header = () => {
	const { user, loading } = useAuth();

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<header className="flex justify-between items-center p-4 border-b">
			<Link href="/chat" className="text-xl font-bold">
				<button>Chat App</button>
			</Link>
			<nav>
				{!loading ? (
					!user ? (
						<Link href="/login">
							<Button size="sm" colorScheme="teal" variant="solid">
								Login
							</Button>
						</Link>
					) : (
						<Stack spacing={4} direction="row" align="center">
							<Button
								size="sm"
								colorScheme="red"
								onClick={handleLogout}
								className="items-center">
								LOGOUT
							</Button>
							<Avatar
								size="sm"
								name={user.email || "Who"}
								bg="teal.500"
								color="white"
							/>
						</Stack>
					)
				) : (
					<Spinner color="gray.500" />
				)}
			</nav>
		</header>
	);
};

export default Header;
