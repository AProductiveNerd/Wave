import "../styles/globals.css";
import UserContext from "../context/UserContext";
import { fireAuth, firebase } from "../libs/Firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

function MyApp({ Component, pageProps }) {
	const [user, loading] = useAuthState(fireAuth);

	const router = useRouter();

	useEffect(() => {
		if (!loading && !user) {
			router.push("/sign-in");
		}
	}, [loading]);

	return !loading ? (
		<UserContext.Provider value={{ user }}>
			<Component {...pageProps} />
		</UserContext.Provider>
	) : (
		<p>Loading...</p>
	);
}

export default MyApp;
