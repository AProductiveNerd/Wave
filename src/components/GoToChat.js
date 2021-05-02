import Link from "next/link";

export const GoTochat = ({ chat, user }) => {
	console.log(chat);
	return (
		<Link href={`/chat/${chat.docId}`}>
			{chat.participants.filter((email) => email !== user.email)[0]}
		</Link>
	);
};
