import { firebase } from "../libs/Firebase";

export const doesUsernameExist = async (username) => {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get();

	return result.docs.map((user) => user.data().length > 0);
};

export const getUserByUsername = async (username) => {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("username", "==", username)
		.get();

	return result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));
};

export const getUserByUserId = async (userId) => {
	const result = await firebase
		.firestore()
		.collection("users")
		.where("userId", "==", userId)
		.get();
	const user = result.docs.map((item) => ({
		...item.data(),
		docId: item.id,
	}));

	return user;
};

export const getUserChats = ({ user, userChats, setUserChats }) => {
	firebase
		.firestore()
		.collection("chats")
		.where("participants", "array-contains", user.email)
		.onSnapshot((querySnapshot) => {
			var chats = [];

			querySnapshot.forEach((doc) => {
				chats.push({
					...doc.data(),
					docId: doc.id,
				});
			});

			if (JSON.stringify(chats) !== JSON.stringify(userChats)) {
				setUserChats(chats);
			}
		});
};
