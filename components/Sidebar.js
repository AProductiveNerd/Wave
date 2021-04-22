import {
	ChatAltIcon,
	DotsVerticalIcon,
	StatusOnlineIcon,
} from "@heroicons/react/outline";
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

	return (
		<div className="flex flex-col h-screen w-max bg-theme-primary min-w-[250px]">
			<header className="bg-gray-600">
				<div className="flex flex-row justify-between items-center p-3">
					<img src={currUser?.avatar} className="w-10 h-10" alt="" />
					<div className="text-gray-300 flex flex-row items-center">
						<button>
							<ChatAltIcon className="w-8 h-8" />
						</button>
						<button>
							<DotsVerticalIcon className="w-8 h-8" />
						</button>
						<button>
							<StatusOnlineIcon className="w-8 h-8" />
						</button>
					</div>
				</div>
				<div className="bg-theme-primary p-3 border-b-[1px] border-gray-400">
					<input
						type="text"
						name="search-chats"
						className=" text-white rounded shadow p-2 w-full focus:outline-none text-sm bg-gray-600"
						placeholder="Search..."
					/>
				</div>
			</header>
		</div>
	);
};
