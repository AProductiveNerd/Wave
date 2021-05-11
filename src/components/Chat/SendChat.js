import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import FirebaseContext from "../../context/FirebaseContext";
import UserContext from "../../context/UserContext";
import { FieldValue } from "../../libs/Firebase";
import { getUserByUserId } from "../../utils/firebase";

export const SendChat = () => {
	const { firebase, storage } = useContext(FirebaseContext);
	const { user } = useContext(UserContext);
	const router = useRouter();
	const [currUser, setCurrUser] = useState(null);
	const [input, setInput] = useState(undefined);
	const [mainHeight, setMainHeight] = useState(0);
	const [image, setImage] = useState();

	const userId = user?.uid;

	useEffect(() => {
		const fetchCurrUser = async () => {
			const ret = await getUserByUserId(user?.uid);
			setCurrUser(ret[0]);
		};
		fetchCurrUser();
	}, [user]);

	const sendMessage = (e) => {
		e.preventDefault();
		firebase?.firestore().collection("users").doc(currUser?.docId).set(
			{
				lastSeen: FieldValue?.serverTimestamp(),
			},
			{ merge: true }
		);

		firebase
			?.firestore()
			.collection("chats")
			.doc(router.query.id)
			.collection("messages")
			.add({
				timestamp: FieldValue?.serverTimestamp(),
				message: input,
				user: user.email,
				photoURL: currUser.avatar,
			});

		setInput("");
	};

	useEffect(() => {
		setMainHeight(document.getElementById("chatPage").offsetHeight);
	}, []);

	document
		.getElementById("pasteTarget")
		?.addEventListener("paste", handlePaste);

	function handlePaste(e) {
		if (!input) {
			var image = e.clipboardData.items[0].getAsFile();
			if (image.type.indexOf("image") != -1) {
				setImage(image);
			}
		}
	}

	const sendImage = (e) => {
		e.preventDefault();
		console.log("hi");
		firebase?.firestore().collection("users").doc(currUser?.docId).set(
			{
				lastSeen: FieldValue?.serverTimestamp(),
			},
			{ merge: true }
		);
		const uploadTask = storage
			.ref(`images/${userId}/${image?.name}`)
			.put(image);
		uploadTask.on(
			"state_changed",
			(snapshot) => {},
			(error) => {},
			() => {
				storage
					.ref("images")
					.child(`${userId}/${image?.name}`)
					.getDownloadURL()
					.then((url) => {
						console.log("HOOOOOOO", url);
						firebase
							.firestore()
							.collection("chats")
							.doc(router.query.id)
							.collection("messages")
							.add({
								image: true,
								timestamp: FieldValue?.serverTimestamp(),
								imageSrc: url,
								user: user?.email,
								photoURL: currUser?.avatar,
							});
					});
			}
		);
	};

	return (
		<div
			className={`${
				mainHeight > window.innerHeight ? "sticky" : "absolute"
			} bottom-0 w-full bg-indigo-600 p-2`}
		>
			<form>
				<center className="w-full">
					<div className="flex mx-auto justify-center">
						<input
							className="w-full outline-none border-none rounded-lg bg-gray-300 text-lg p-2 md:w-9/12 lg:w-8/12 font-semibold"
							id="pasteTarget"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							type="text"
						/>
					</div>
				</center>
				<button
					hidden
					disabled={!input}
					type="submit"
					onClick={sendMessage}
				>
					Send Message
				</button>
			</form>
			{image && <button onClick={sendImage}>Send Image</button>}
		</div>
	);
};
