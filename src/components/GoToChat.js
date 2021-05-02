import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserByEmail } from "./../utils/firebase";
import { formatRelative } from "date-fns";

export const GoTochat = ({ chat, user }) => {
	const displayName = chat.participants.filter(
		(email) => email !== user.email
	)[0];

	const [mate, setMate] = useState();

	useEffect(() => {
		const funcy = async () => {
			const doc = await getUserByEmail(displayName);
			setMate(doc[0]);
		};
		funcy();
	}, [displayName]);

	// if (mate?.lastSeen) {
	// 	// console.log("yes", mate.lastSeen);
	// 	// console.log(new Date(1619111106045));
	// 	console.log(formatRelative(mate.lastSeen, Date.now()));
	// }
	return (
		<Link href={`/chat/${chat.docId}`}>
			<div className="flex flex-row items-center cursor-pointer">
				<img src={mate?.avatar} alt="hui" className="w-12 h-12" />
				<div className="ml-1 flex-1">
					<p aria-label={displayName}>{mate?.username}</p>
					<span className="flex font-extralight items-center text-gray-500 border-gray-300 border-solid border-b">
						{/* <CheckIcon className="h-4 w-4" /> */}
						{/* {formatRelative(mate?.lastSeen, Date.now())} */}
					</span>
				</div>
			</div>
		</Link>
	);
};
