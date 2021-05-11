import * as EmailValidator from "email-validator";
import FirebaseContext from "../../context/FirebaseContext";

import { ChatAlt2Icon } from "@heroicons/react/solid";
import { useContext, useEffect, useState } from "react";

export const AddChat = ({ user, userChats }) => {
	const { firebase } = useContext(FirebaseContext);
	const [mainHeight, setMainHeight] = useState(0);

	const chatAlreadyExists = (tryEmail) => {
		const retVal = userChats.map((chat) => {
			const chatMate = chat.participants.filter(
				(email) => email !== user?.email
			)[0];

			if (chatMate === tryEmail) {
				return true;
			}
		});

		return retVal[0] || false;
	};

	const addChat = () => {
		const input = prompt(
			"Please enter an email address for the user you wish to chat with"
		);
		if (!input) return null;

		if (EmailValidator.validate(input) && !chatAlreadyExists(input)) {
			firebase
				.firestore()
				.collection("chats")
				.add({
					participants: [user?.email, input],
				});
		} else {
			return alert("An error occured");
		}
	};

	useEffect(() => {
		setMainHeight(document.getElementById("chatList").offsetHeight);
	}, []);

	return (
		<button
			onClick={addChat}
			className={` ${
				mainHeight > window.innerHeight
					? "sticky left-full"
					: "absolute right-4"
			} bottom-10 mr-3 bg-indigo-600 rounded-full p-2 hover:shadow-2xl transition transform hover:-translate-y-2`}
		>
			<ChatAlt2Icon className="h-8 w-8" />
		</button>
	);
};
