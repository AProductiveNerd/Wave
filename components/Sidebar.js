import { DotsVerticalIcon, ChatAltIcon } from "@heroicons/react/outline";

import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { getUserByUserId } from "./../utils/firebase";

export const Sidebar = () => {
	const { user } = useContext(UserContext);
	const [currUser, setCurrUser] = useState(null);

	useEffect(() => {
		const fetchCurrUser = async () => {
			const ret = await getUserByUserId(user?.uid);
			setCurrUser(ret[0]);
		};
		fetchCurrUser();
	}, [user]);

	const addChat = () => {
		const input = prompt(
			"Please enter an email address for the user you wish to chat with"
		);

		if (!input) return null;
	};

	return (
		<div className="min-h-screen bg-gray-50 relative flex items-center">
			<header className="flex p-4 justify-between bg-indigo-600 absolute top-0 w-full">
				<img
					src={currUser?.avatar}
					className="w-12 h-12"
					alt="user-avatar"
				/>
				<div className="flex items-center text-white">
					<button onClick={addChat}>
						<ChatAltIcon className="w-9 h-9" />
					</button>
					<button>
						<DotsVerticalIcon className="w-9 h-9" />
					</button>
				</div>
			</header>
			<div className="absolute w-full top-24 h-[80%] overflow-y-scroll">
				<div className="bg-indigo-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat (unread)
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
				<div className="bg-gray-300 w-full p-4 font-semibold rounded border-b-2 border-gray-400">
					Chat
				</div>
			</div>
		</div>
	);
};
