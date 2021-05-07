import { useContext, useEffect, useRef, useState } from "react";
import FirebaseContext from "../context/FirebaseContext";
import { useRouter } from "next/router";
import { IndividualChat } from "./IndividualChat";

export const DisplayChat = () => {
	const { firebase } = useContext(FirebaseContext);
	const router = useRouter();
	const [chats, setChats] = useState([]);

	const myRef = useRef();

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
					myRef.current?.scrollIntoView({ behavior: "smooth" });
					setChats(chats);
				});
		}
	}, [firebase]);

	return (
		<div
			className="max-h-[94vh] space-y-4 overflow-y-scroll mx-auto w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12"
			id="noScrollbar"
		>
			{chats.map((chat) => (
				<IndividualChat key={chat.chatId} chat={chat} />
			))}
			<div ref={myRef}></div>
		</div>
	);
};
