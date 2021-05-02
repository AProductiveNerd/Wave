import { useContext } from "react";
import UserContext from "../context/UserContext";

export const IndividualChat = ({ chat }) => {
	const { user } = useContext(UserContext);

	console.log(chat);
	return (
		<div>
			<p
				className={`${
					user?.email === chat.user ? "text-right" : "text-left"
				}`}
			>
				{chat.message}
			</p>
		</div>
	);
};
