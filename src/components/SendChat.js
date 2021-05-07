import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../context/FirebaseContext";
import UserContext from "../context/UserContext";
import { FieldValue } from "../libs/Firebase";
import { getUserByUserId } from "../utils/firebase";

export const SendChat = () => {
	const { firebase } = useContext(FirebaseContext);
	const { user } = useContext(UserContext);
	const router = useRouter();
	const [currUser, setCurrUser] = useState(null);
	const [input, setInput] = useState("");
	const [mainHeight, setMainHeight] = useState(0);

	useEffect(() => {
		const fetchCurrUser = async () => {
			const ret = await getUserByUserId(user?.uid);
			setCurrUser(ret[0]);
		};
		fetchCurrUser();
	}, [user]);

	const sendMessage = (e) => {
		e.preventDefault();
		firebase?.firestore().collection("users").doc(currUser?.docId).set(
			{
				lastSeen: FieldValue?.serverTimestamp(),
			},
			{ merge: true }
		);

		firebase
			?.firestore()
			.collection("chats")
			.doc(router.query.id)
			.collection("messages")
			.add({
				timestamp: FieldValue?.serverTimestamp(),
				message: input,
				user: user.email,
				photoURL: user.photoURL,
			});

		setInput("");
	};

	useEffect(() => {
		setMainHeight(document.getElementById("chatPage").offsetHeight);
	}, []);
	return (
		<form
			className={` ${
				mainHeight > window.innerHeight ? "sticky" : "absolute"
			} bottom-0 w-full bg-indigo-600 p-2`}
		>
			<center className="w-full">
				<input
					className="w-full outline-none border-none rounded-lg bg-gray-300 text-lg p-2 md:w-9/12 lg:w-8/12"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					type="text"
				/>
			</center>
			<button
				hidden
				disabled={!input}
				type="submit"
				onClick={sendMessage}
				className="hidden w-0"
			>
				Send Message
			</button>
		</form>
	);
};
