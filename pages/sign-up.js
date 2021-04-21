import Head from "next/head";
import Link from "next/link";
import { AvatarGenerator } from "random-avatar-generator";
import { useState } from "react";
import { firebase } from "../libs/Firebase";
import { doesUsernameExist } from "../utils/firebase";
import { useRouter } from "next/router";

export default function SignUp() {
	const generator = new AvatarGenerator();
	const router = useRouter();

	const [username, setUsername] = useState("");
	const [fullName, setFullName] = useState("");
	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [avatar, setAvatar] = useState("");
	const [error, setError] = useState("");
	const isInvalid =
		password === "" ||
		emailAddress === "" ||
		fullName === "" ||
		username === "";

	const handleSignUp = async (event) => {
		event.preventDefault();

		const usernameExists = await doesUsernameExist(username);
		if (!usernameExists.length && avatar !== "") {
			try {
				const createdUserResult = await firebase
					.auth()
					.createUserWithEmailAndPassword(emailAddress, password);

				await createdUserResult.user.updateProfile({
					displayName: username,
				});

				await firebase.firestore().collection("users").add({
					avatar: avatar,
					userId: createdUserResult.user.uid,
					username: username.toLowerCase(),
					fullName,
					emailAddress: emailAddress.toLowerCase(),
					dateCreated: Date.now(),
				});

				router.push("/");
			} catch (error) {
				setFullName("");
				setEmailAddress("");
				setPassword("");
				setError(error.message);
			}
		} else {
			setUsername("");
			setError("That username is already taken, please try another.");
		}
	};

	return (
		<div className="h-screen w-screen bg-gray-800 flex items-center justify-center">
			<Head>
				<title>Sign Up | Wave</title>
			</Head>
			<span className="wrapper">
				<div className="bg-white rounded p-5 w-full shadow-xl">
					<div className="space-y-2">
						<div className="space-y-1">
							<h2 className="font-semibold text-2xl">Sign Up</h2>
							<hr className="h-1 border-opacity-100 border-2 border-solid shadow-sm" />
						</div>

						{error && (
							<p className="mb-4 text-xs text-red-500">{error}</p>
						)}
						<form
							onSubmit={handleSignUp}
							method="POST"
							className="space-y-2 flex text-gray-500 font-bold flex-col"
						>
							<input
								aria-label="Enter your username"
								type="text"
								className="text-sm text-gray-base w-full mr-3 px-4 h-11 border border-theme-background rounded"
								placeholder="Username"
								onChange={({ target }) =>
									setUsername(target.value)
								}
								value={username}
							/>
							<input
								aria-label="Enter your full name"
								type="text"
								className="text-sm text-gray-base w-full mr-3 px-4 h-11 border border-theme-background rounded"
								placeholder="Full name"
								onChange={({ target }) =>
									setFullName(target.value)
								}
								value={fullName}
							/>
							<input
								aria-label="Enter your email address"
								className="text-sm text-gray-base w-full mr-3 px-4 h-11 border border-theme-background rounded"
								type="text"
								placeholder="Email address"
								onChange={({ target }) =>
									setEmailAddress(target.value)
								}
								value={emailAddress}
							/>
							<input
								aria-label="Enter your password"
								className="text-sm text-gray-base w-full mr-3 px-4 h-11 border border-theme-background rounded"
								type="password"
								placeholder="Password"
								onChange={({ target }) =>
									setPassword(target.value)
								}
								value={password}
							/>

							{!isInvalid && (
								<div className="space-y-2">
									<hr />
									<div className="flex flex-col items-center justify-center">
										<button
											type="button"
											onClick={() =>
												setAvatar(
													generator.generateRandomAvatar()
												)
											}
											className="bg-theme-primary text-white w-full rounded h-11 font-bold border border-theme-background opacity-100"
										>
											Generate avatar
										</button>

										{avatar !== "" ? (
											<img
												className="max-h-60 -mt-2"
												alt="avatar"
												src={avatar}
											/>
										) : null}
									</div>
									{avatar !== "" ? (
										<button
											type="submit"
											className="bg-theme-primary text-white w-full rounded h-8 font-bold"
										>
											Sign Up
										</button>
									) : null}
								</div>
							)}
						</form>
						<p className="text-sm mt-3 sm:mt-2">
							Already have an account?{` `}
							<span className="font-semibold text-blue-500">
								<Link
									href="/sign-in"
									aria-label="Link to Login"
									title="Link to Login"
								>
									Login
								</Link>
							</span>
						</p>
					</div>
				</div>
			</span>
		</div>
	);
}
