import { useContext, useEffect, useState } from "react";
import { FieldValue } from "../../libs/Firebase";
import { useRouter } from "next/router";
import FirebaseContext from "../../context/FirebaseContext";
import UserContext from "../../context/UserContext";
import { IndividualChat } from "../IndividualChat";
import { getUserByUserId } from "../../utils/firebase";

export const ChatPanel = () => {
	const router = useRouter();
	const [input, setInput] = useState("");
	const { user } = useContext(UserContext);
	const [currUser, setCurrUser] = useState(null);
	const { firebase } = useContext(FirebaseContext);
	const [chats, setChats] = useState([]);

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
		if (firebase) {
			firebase
				.firestore()
				.collection("chats")
				.doc(router.query.id)
				.collection("messages")
				.orderBy("timestamp", "asc")
				.onSnapshot((querySnapshot) => {
					var chats = [];
					querySnapshot.forEach((doc) => {
						chats.push({ ...doc.data(), chatId: doc.id });
					});
					setChats(chats);
				});
		}
	}, [firebase, router.query.id]);

	useEffect(() => {
		setMainHeight(document.getElementById("chatPage").offsetHeight);
	}, []);

	return (
		<div className="relative mx-auto w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12"></div>
	);
};
