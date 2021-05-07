import { formatRelative } from "date-fns";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../context/FirebaseContext";
import UserContext from "../context/UserContext";
import { getUserByEmail } from "./../utils/firebase";

export const ChatDisplayHeader = () => {
	const { firebase } = useContext(FirebaseContext);
	const { user } = useContext(UserContext);
	const router = useRouter();

	const currChatDoc = router.query.id;

	const [chatMateInfo, setChatMateInfo] = useState();

	useEffect(() => {
		const getChatmateInfo = async () => {
			const participants = await firebase
				.firestore()
				.collection("chats")
				.doc(currChatDoc)
				.get()
				.then((doc) => {
					return doc.data().participants;
				});

			const chatMate = participants.filter(
				(email) => email !== user?.email
			)[0];

			if (chatMate) {
				const info = await getUserByEmail(chatMate);
				setChatMateInfo(info[0]);
			}
		};

		getChatmateInfo();
	}, [currChatDoc]);

	return (
		<div className="sticky top-0 w-full bg-indigo-600 p-2 mb-3 flex items-center flex-row">
			<Head>
				<title>Chat with {chatMateInfo?.username} | Wave</title>
			</Head>
			<img
				src={chatMateInfo?.avatar}
				alt="user-avatar"
				className="w-12 h-12"
			/>
			<div className="ml-1 flex-1">
				<p
					aria-label={chatMateInfo?.username}
					className="text-white font-bold"
				>
					{chatMateInfo?.username}
				</p>
				<span className="flex font-semibold text-xs items-center text-gray-300 border-gray-300 border-solid border-b">
					{chatMateInfo ? (
						<p>
							Last seen {` `}
							{formatRelative(
								chatMateInfo?.lastSeen.seconds * 1000,
								Date.now()
							)}
						</p>
					) : (
						<p>Chat</p>
					)}
				</span>
			</div>
		</div>
	);
};
