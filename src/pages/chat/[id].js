import { Sidebar } from "../../components/Sidebar";
import { useRouter } from "next/router";
import { ChatPanel } from "../../components/ChatPanel";

export default function ChatDisplay() {
	const router = useRouter();
	return (
		<div>
			<h1>hi from {router.query.id}</h1>
			<ChatPanel />
		</div>
	);
}
