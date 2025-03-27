"use client";
import { useEffect, useRef, useState } from "react";
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
import { Avatar } from "@chakra-ui/react";
import { getFormattedRelativeTime } from '../../lib/dayjs/date';


interface Message {
	id: string;
	user: string;
	uid: string;
	text: string;
	timestamp: number;
}

export default function ChatPage() {
	const { user } = useAuth();

	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const adjustHeight = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	};

	const messagesEndRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

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

	const isMe = (uid: string) => {
		return user?.uid === uid;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newMessage.trim()) return;

		try {
			await addDoc(collection(db, "messages"), {
				user: user?.email,
				uid: user?.uid,
				text: newMessage,
				timestamp: Date.now(),
			});
			setNewMessage("");
			adjustHeight();
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	return (
		<AuthGuard>
			<div className="flex flex-col max-w-2xl mx-auto">
				<div className="overflow-y-auto p-4">
					{messages.map((message) =>
						isMe(message.uid) ? (
							<div key={message.id} className="flex py-2 w-full">
								<Avatar
									size="sm"
									name={message.user}
									bg="teal.500"
									color="white"
								/>
                <div className="ml-4 border rounded-md min-w-[200px] px-4 py-2">
                  <p className="text-gray-300 text-xs">{getFormattedRelativeTime(message.timestamp)}</p>
									<p className="text-gray-500">{message.user} (Me)</p>
									<p className="whitespace-pre-line">{message.text}</p>
								</div>
							</div>
						) : (
							<div key={message.id} className="flex justify-end w-full py-2">
                  <div className="mr-4 border rounded-md min-w-[100px] px-4 py-2">
                  <p className="text-gray-300 text-xs">{getFormattedRelativeTime(message.timestamp)}</p>
									<p className="text-gray-500 text-end">{message.user}</p>
									<p className="whitespace-pre-line">{message.text}</p>
								</div>
								<Avatar
									size="sm"
									name={message.user}
									bg="gray.500"
									color="white"
								/>
							</div>
						)
					)}
					<div ref={messagesEndRef} />
				</div>
				<form
					onSubmit={handleSubmit}
					className="flex bg-white rounded-lg border p-2 mt-20 sticky bottom-0">
					<textarea
						ref={textareaRef}
						value={newMessage}
						onChange={(e) => {
							setNewMessage(e.target.value);
							adjustHeight();
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();
								handleSubmit(e);
							}
						}}
						placeholder="Type your message..."
						className="outline-non flex-grow rounded px-2 py-1 mr-2 resize-none"
						rows={1}
						style={{ minHeight: "30px" }}
					/>

					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-1 rounded">
						送信
					</button>
				</form>
			</div>
		</AuthGuard>
	);
}
