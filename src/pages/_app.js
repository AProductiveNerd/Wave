import "../styles/globals.css";
import UserContext from "../context/UserContext";
import { fireAuth, firebase, storage } from "../libs/Firebase";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import FirebaseContext from "../context/FirebaseContext";

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
			<FirebaseContext.Provider value={{ firebase, storage }}>
				<Component {...pageProps} />
			</FirebaseContext.Provider>
		</UserContext.Provider>
	) : (
		<p>Loading...</p>
	);
}

export default MyApp;
