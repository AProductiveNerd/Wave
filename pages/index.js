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

	return !loading ? (
		<div>
			<Head>
				<title>Wave</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<UserContext.Provider value={{ user }}>
				<Sidebar />
			</UserContext.Provider>
		</div>
	) : (
		<p>Loading...</p>
	);
}

// teal 800
// cyan
