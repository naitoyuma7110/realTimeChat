import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";

type User = {
	uid: string;
	email: string | null;
	displayName: string | null;
} | null;

export const observeAuthState = (callback: (user: User) => void) => {
	onAuthStateChanged(auth, (user) => {
		callback(user);
	});
};
