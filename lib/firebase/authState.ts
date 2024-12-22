import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";

export const observeAuthState = (callback: (user: any) => void) => {
	onAuthStateChanged(auth, (user) => {
		callback(user);
	});
};
