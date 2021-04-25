import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import UserContext from "../context/UserContext";
import { fireAuth, firebase } from "../libs/Firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
	const [user, loading] = useAuthState(fireAuth);

	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
			router.push("/sign-in");
		}
	}, [loading]);

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
