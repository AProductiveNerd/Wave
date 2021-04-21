import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import UserContext from "../context/UserContext";
import { fireAuth } from "../libs/Firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
	const [user, loading] = useAuthState(fireAuth);
	const router = useRouter();
	useEffect(() => {
		if (!loading && !user) {
			router.push("/sign-up");
		}
	}, [loading]);

	return !loading ? (
		<div>
			<Head>
				<title>Wave</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<UserContext.Provider value={{ user }}>
				<div className="bg-gray-800">
					<Sidebar />
				</div>
			</UserContext.Provider>
		</div>
	) : (
		<p>Loading...</p>
	);
}

// teal 800
// cyan
