import { NextResponse } from "next/server";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib//firebase/config";

export async function POST(request: Request) {
	const { user, text } = await request.json();

	if (!user || !text) {
		return NextResponse.json({ error: "Invalid data" }, { status: 400 });
	}

	try {
		await addDoc(collection(db, "messages"), {
			user,
			text,
			timestamp: Date.now(),
		});
		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
