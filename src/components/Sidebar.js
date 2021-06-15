import { DotsVerticalIcon, SearchIcon } from "@heroicons/react/outline";
import { getUserByUserId, getUserChats } from "./../utils/firebase";
import { useContext, useEffect, useState } from "react";

import UserContext from "../context/UserContext";
import { AddChat } from "./Chat/AddChat";
import { GoTochat } from "./GoToChat";

export const Sidebar = () => {
	const { user } = useContext(UserContext);
	const [currUser, setCurrUser] = useState(null);
	const [userChats, setUserChats] = useState([]);

	useEffect(() => {
		const fetchCurrUser = async () => {
			const ret = await getUserByUserId(user?.uid);
			setCurrUser(ret[0]);
		};
		fetchCurrUser();
	}, [user]);

	useEffect(() => {
		if (user) {
			getUserChats({ user, userChats, setUserChats });
		}
	}, [user, userChats]);

	return (
		<div
			className="text-white min-h-screen relative bg-gray-50"
			id="chatList"
		>
			<div>
				<header className="bg-indigo-600 p-2 sticky top-0 w-full">
					<div className="flex justify-between items-center">
						<span className="text-lg font-semibold">Wave</span>
						<div className="flex items-center">
							<button>
								<SearchIcon className="w-7 h-7" />
							</button>
							<button>
								<DotsVerticalIcon className="w-7 h-7" />
							</button>
						</div>
					</div>
				</header>
				<div className="text-black font-semibold p-2 space-y-2">
					{userChats.map((chat) => (
						<GoTochat key={chat.docId} chat={chat} user={user} />
					))}
				</div>
			</div>
			<AddChat user={user} userChats={userChats} />
		</div>
	);
};
