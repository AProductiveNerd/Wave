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

	return (
		<Link href={`/chat/${chat.docId}`}>
			<div className="flex flex-row items-center cursor-pointer">
				<img
					src={mate?.avatar}
					alt="user-avatar"
					className="w-12 h-12"
				/>
				<div className="ml-1 flex-1">
					<p aria-label={displayName}>{mate?.username}</p>
					<span className="flex font-light text-xs items-center text-gray-500 border-gray-300 border-solid border-b">
						{mate ? (
							<p>
								Last seen {` `}
								{formatRelative(
									mate?.lastSeen.seconds * 1000,
									Date.now()
								)}
							</p>
						) : (
							<p>Chat</p>
						)}
					</span>
				</div>
			</div>
		</Link>
	);
};
