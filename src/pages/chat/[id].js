import { DisplayChat } from "./../../components/DisplayChat";
import { SendChat } from "./../../components/SendChat";

export default function ChatDisplay() {
	return (
		<div id="chatPage" className="bg-gray-50">
			<DisplayChat />
			<SendChat />
		</div>
	);
}
