import { DisplayChat } from "./../../components/DisplayChat";
import { SendChat } from "./../../components/SendChat";
import { ChatDisplayHeader } from "./../../components/ChatDisplayHeader";

export default function ChatDisplay() {
	return (
		<div id="chatPage" className="bg-gray-50">
			<ChatDisplayHeader />
			<DisplayChat />
			<SendChat />
		</div>
	);
}
