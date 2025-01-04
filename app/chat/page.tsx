"use client";
import { useEffect, useState } from "react";
import {
	collection,
	query,
	orderBy,
	onSnapshot,
	addDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/app/feature/auth/context/auth-context";
import AuthGuard from "@/app/feature/auth/AuthGurd";
import { Spinner } from "@chakra-ui/react";

interface Message {
	id: string;
	user: string;
	text: string;
	timestamp: number;
}

export default function ChatPage() {
	const { user } = useAuth();

	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState("");
	const [currentUser] = useState(user?.email || "Who");

	useEffect(() => {
		const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
		const unsubscribe = onSnapshot(q, (snapshot) => {
			const loadedMessages = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			})) as Message[];
			setMessages(loadedMessages);
		});

		return () => unsubscribe();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newMessage.trim()) return;

		try {
			await addDoc(collection(db, "messages"), {
				user: currentUser,
				text: newMessage,
				timestamp: Date.now(),
			});
			setNewMessage("");
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	return (
		<AuthGuard>
			<div className="flex flex-col h-screen">
				<Spinner color="red.500" />
				<div className="flex-grow overflow-y-auto p-4">
					{messages.map((message) => (
						<div key={message.id} className="mb-2">
							<strong>{message.user}:</strong> {message.text}
						</div>
					))}
				</div>
				<form onSubmit={handleSubmit} className="flex p-4 border-t">
					<input
						type="text"
						value={newMessage}
						onChange={(e) => setNewMessage(e.target.value)}
						placeholder="Type your message..."
						className="flex-grow border rounded px-2 py-1 mr-2"
					/>
					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-1 rounded">
						Send
					</button>
				</form>
			</div>
		</AuthGuard>
	);
}
