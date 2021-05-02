import {
	CheckIcon,
	DotsVerticalIcon,
	SearchIcon,
	UserCircleIcon,
} from "@heroicons/react/outline";

import { getUserByUserId, getUserChats } from "./../utils/firebase";
import { useContext, useEffect, useState } from "react";

import UserContext from "../context/UserContext";
import { AddChat } from "./AddChat";
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
	}, [userChats]);

	return (
		<div className="text-white min-h-screen relative" id="chatList">
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
					<div className="flex flex-row">
						<UserCircleIcon className="h-12 w-12" />
						<div className="flex flex-col ml-1 flex-1">
							<p>Vaibhav</p>
							<span className="flex font-extralight items-center text-gray-500 border-gray-300 border-solid border-b">
								<CheckIcon className="h-4 w-4" />
								some text
							</span>
						</div>
					</div>
					{userChats.map((chat) => (
						<GoTochat key={chat.docId} chat={chat} user={user} />
					))}
				</div>
			</div>
			<AddChat user={user} userChats={userChats} />
		</div>
	);
};
