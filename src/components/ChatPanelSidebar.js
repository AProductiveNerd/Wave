import {
	CheckIcon,
	DotsVerticalIcon,
	SearchIcon,
	UserCircleIcon,
} from "@heroicons/react/outline";
import { useContext, useEffect, useState } from "react";

import { ChatAlt2Icon } from "@heroicons/react/solid";
import UserContext from "../context/UserContext";
import { getUserByUserId } from "./../utils/firebase";

export const ChatPanelSidebar = () => {
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
		<div className="text-white w-max hidden min-w-[250px] sm:block">
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
				</div>
			</div>
			<button
				onClick={addChat}
				className="sticky bottom-10 left-full mr-3 bg-indigo-600 rounded-full p-2 hover:shadow-2xl transition transform hover:-translate-y-2"
			>
				<ChatAlt2Icon className="h-8 w-8" />
			</button>
		</div>
	);
};
