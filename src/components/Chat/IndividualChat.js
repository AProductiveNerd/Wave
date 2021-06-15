import { useContext } from "react";
import UserContext from "../../context/UserContext";

export const IndividualChat = ({ chat }) => {
	const { user } = useContext(UserContext);
	return (
		<div
			className={`${
				user?.email === chat.user ? "justify-end" : "justify-start"
			} flex text-white`}
		>
			<div
				className={`${
					user?.email === chat.user
						? "bg-blue-600 rounded-tr-none"
						: "bg-gray-400 rounded-tl-none"
				} w-max p-3 rounded-2xl max-w-xs`}
			>
				{chat.image === true ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img src={chat.imageSrc} alt={chat.user} />
				) : (
					<p className="break-words">{chat.message}</p>
				)}
			</div>
		</div>
	);
};
