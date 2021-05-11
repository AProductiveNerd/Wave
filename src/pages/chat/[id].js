import { ChatDisplayHeader } from "./../../components/Chat/ChatDisplayHeader";
import { DisplayChat } from "./../../components/Chat/DisplayChat";
import { SendChat } from "./../../components/Chat/SendChat";

export default function ChatDisplay() {
	return (
		<div id="chatPage" className="bg-gray-50">
			<ChatDisplayHeader />
			<DisplayChat />
			<SendChat />
		</div>
	);
}
