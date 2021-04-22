import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import UserContext from "../context/UserContext";
import { fireAuth, firebase } from "../libs/Firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import * as EmailValidator from "email-validator";
import { getUserByUserId } from "./../utils/firebase";

export default function Home() {
	const [user, loading] = useAuthState(fireAuth);

	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
			router.push("/sign-up");
		}
	}, [loading]);

	const alreadyFollowing = async () => {
		if (user) {
			const currUser = await getUserByUserId(user?.uid);
		}
	};
	alreadyFollowing();

	const addChat = () => {
		const input = prompt(
			"Please enter an email address for the user you wish to chat with"
		);

		if (!input) return null;
	};

	return !loading ? (
		<div>
			<Head>
				<title>Wave</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<UserContext.Provider value={{ user }}>
				<Sidebar />
				<button
					className="absolute bottom-14 right-8 bg-red-400 p-5 rounded-full"
					onClick={addChat}
				>
					Add Chat
				</button>
			</UserContext.Provider>
		</div>
	) : (
		<p>Loading...</p>
	);
}

// teal 800
// cyan
