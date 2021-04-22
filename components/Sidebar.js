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
		<div className="min-h-screen flex flex-col justify-between bg-gray-50">
			<div className="pt-6 px-4 sm:px-6 lg:px-8">
				<h1 className="text-5xl font-extrabold text-indigo-600">
					Wave
				</h1>
				<div className="space-y-2 overflow-x-hidden max-h-[420px] mt-6">
					<div className="bg-indigo-300 w-full p-2 font-semibold rounded">
						Chat (unread)
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
					<div className="bg-gray-300 w-full p-2 font-semibold rounded">
						Chat
					</div>
				</div>
			</div>
			<footer className="flex flex-row justify-between items-center py-6 px-4 sm:px-6 lg:px-8 bg-indigo-600 text-white">
				<img
					src={currUser?.avatar}
					className="w-12 h-12"
					alt="user-avatar"
				/>
				<div className="flex items-center">
					<button onClick={addChat}>
						<ChatAltIcon className="w-9 h-9" />
					</button>
					<button>
						<DotsVerticalIcon className="w-9 h-9" />
					</button>
				</div>
			</footer>
		</div>
	);
};
