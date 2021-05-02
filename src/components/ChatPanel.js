import { useContext, useEffect, useState } from "react";
import { FieldValue } from "../libs/Firebase";
import { useRouter } from "next/router";
import FirebaseContext from "./../context/FirebaseContext";
import UserContext from "./../context/UserContext";
import { IndividualChat } from "./IndividualChat";
import { getUserByUserId } from "../utils/firebase";

export const ChatPanel = () => {
	const router = useRouter();
	const [input, setInput] = useState("");
	const { user } = useContext(UserContext);
	const [currUser, setCurrUser] = useState(null);
	const { firebase } = useContext(FirebaseContext);
	const [chats, setChats] = useState([]);

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
		if (firebase) {
			firebase
				.firestore()
				.collection("chats")
				.doc(router.query.id)
				.collection("messages")
				.orderBy("timestamp", "asc")
				.onSnapshot((querySnapshot) => {
					var cities = [];
					querySnapshot.forEach((doc) => {
						cities.push(doc.data());
					});
					setChats(cities);
				});
		}
	}, [firebase]);

	return (
		<div>
			<form className="flex items-center p-[10px] absolute bottom-0 right-0 w-full bg-white z-50">
				<input
					className="flex-1 outline-none border-none rounded-lg bg-gray-300 text-lg p-2"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					type="text"
				/>
				<button
					hidden
					disabled={!input}
					type="submit"
					onClick={sendMessage}
				>
					Send Message
				</button>
			</form>
			{chats.map((chat) => (
				<IndividualChat chat={chat} />
			))}
		</div>
	);
};
