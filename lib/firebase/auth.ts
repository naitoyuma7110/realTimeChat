import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "./config";

// 新規登録
export const register = async (email: string, password: string) => {
	const userCredential = await createUserWithEmailAndPassword(
		auth,
		email,
		password
	);
	return userCredential.user;
};

// ログイン
export const login = async (email: string, password: string) => {
	const userCredential = await signInWithEmailAndPassword(
		auth,
		email,
		password
	);
	return userCredential.user;
};

// ログアウト
export const logout = async () => {
	await signOut(auth);
};
