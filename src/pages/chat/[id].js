import { DisplayChat } from "./../../components/DisplayChat";
import { SendChat } from "./../../components/SendChat";

export default function ChatDisplay() {
	return (
		<div id="chatPage">
			<DisplayChat />
			<SendChat />
		</div>
	);
}
