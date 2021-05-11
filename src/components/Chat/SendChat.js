import { useRouter } from "next/router";
import { Fragment, useContext, useEffect, useState } from "react";
import FirebaseContext from "../../context/FirebaseContext";
import UserContext from "../../context/UserContext";
import { FieldValue } from "../../libs/Firebase";
import { getUserByUserId } from "../../utils/firebase";
import { Dialog, Transition } from "@headlessui/react";
import { PhotographIcon } from "@heroicons/react/outline";

export const SendChat = () => {
	const { firebase, storage } = useContext(FirebaseContext);
	const { user } = useContext(UserContext);
	const router = useRouter();
	const [currUser, setCurrUser] = useState(null);
	const [input, setInput] = useState("");
	const [mainHeight, setMainHeight] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}
	const [image, setImage] = useState(null);
	const [imgUrl, setImgUrl] = useState("");

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

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImgUrl(URL.createObjectURL(e.target.files[0]));
			setImage(e.target.files[0]);
		}
	};

	const handleUpload = () => {
		if (image) {
			firebase
				?.firestore()
				.collection("users")
				.doc(currUser?.docId)
				.set(
					{
						lastSeen: FieldValue?.serverTimestamp(),
					},
					{ merge: true }
				);
			const uploadTask = storage
				.ref(`images/${userId}/${image.name}`)
				.put(image);
			uploadTask.on(
				"state_changed",
				(snapshot) => {},
				(error) => {},
				() => {
					storage
						.ref("images")
						.child(`${userId}/${image.name}`)
						.getDownloadURL()
						.then((url) => {
							firebase
								.firestore()
								.collection("chats")
								.doc(router.query.id)
								.collection("messages")
								.add({
									image: true,
									timestamp: FieldValue?.serverTimestamp(),
									imageSrc: url,
									user: user.email,
									photoURL: currUser.avatar,
								});

							setImage(null);
							setImgUrl("");
							setIsOpen(false);
						});
				}
			);
		}
	};

	return (
		<div>
			<form
				className={`${
					mainHeight > window.innerHeight ? "sticky" : "absolute"
				} bottom-0 w-full bg-indigo-600 p-2`}
			>
				<center className="w-full">
					<div className="flex mx-auto justify-center">
						<input
							className="w-full outline-none border-none rounded-lg bg-gray-300 text-lg p-2 md:w-9/12 lg:w-8/12 font-semibold"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							type="text"
						/>

						<div className="flex items-center justify-center w-min">
							<button
								type="button"
								onClick={openModal}
								className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 flex w-min"
							>
								<PhotographIcon className="h-6 w-6" />
							</button>
						</div>
					</div>
				</center>
				<button
					hidden
					disabled={!input}
					type="submit"
					onClick={sendMessage}
					className="hidden w-0"
				>
					Send Message
				</button>
			</form>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto"
					onClose={closeModal}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-gray-900"
								>
									Upload a file
								</Dialog.Title>
								{imgUrl !== "" ? (
									<img src={imgUrl} />
								) : (
									<input
										className="text-sm font-bold text-blue-medium"
										aria-label="Add an image"
										type="file"
										accept="image/*"
										onChange={handleChange}
										id="file-upload"
									/>
								)}

								<button
									className="text-sm font-bold text-blue-medium"
									type="button"
									onKeyDown={(event) => {
										if (event.key === "Enter") {
											handleUpload();
										}
									}}
									onClick={handleUpload}
								>
									Send
								</button>

								<div className="mt-4">
									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={closeModal}
									>
										Close
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};
