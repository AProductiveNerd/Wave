import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { AvatarGenerator } from "random-avatar-generator";
import { useState } from "react";
import { firebase } from "../libs/Firebase";
import { doesUsernameExist } from "../utils/firebase";
import { useRouter } from "next/router";
import { LockClosedIcon } from "@heroicons/react/solid";

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
					dateCreated: Date.now(),
					emailAddress: emailAddress.toLowerCase(),
					followRequests: [],
					following: [],
					fullName,
					userId: createdUserResult.user.uid,
					username: username,
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
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<Head>
				<title>Sign up | Wave</title>
			</Head>
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h1 className="text-6xl font-extrabold text-indigo-600">
						Wave
					</h1>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Create your account
					</h2>
				</div>
				{error && (
					<p className="mb-4 text-sm text-red-500 text-center font-semibold">
						{error}
					</p>
				)}
				<form
					className="mt-8 space-y-6"
					method="POST"
					onSubmit={handleSignUp}
				>
					<input type="hidden" name="remember" defaultValue="true" />
					<div className="rounded-md shadow-sm -space-y-px">
						<div>
							<label htmlFor="email-address" className="sr-only">
								Full Name
							</label>
							<input
								id="fullname"
								name="fullname"
								type="text"
								autoComplete="name"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm h-11"
								placeholder="Full Name"
								onChange={({ target }) =>
									setFullName(target.value)
								}
								value={fullName}
							/>
						</div>
						<div>
							<label htmlFor="email-address" className="sr-only">
								Username
							</label>
							<input
								id="username"
								name="username"
								type="text"
								autoComplete="username"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm h-11"
								placeholder="Username"
								onChange={({ target }) =>
									setUsername(target.value)
								}
								value={username}
							/>
						</div>
						<div>
							<label htmlFor="email-address" className="sr-only">
								Email address
							</label>
							<input
								id="email-address"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm h-11"
								placeholder="Email address"
								onChange={({ target }) =>
									setEmailAddress(target.value)
								}
								value={emailAddress}
							/>
						</div>
						<div>
							<label htmlFor="password" className="sr-only">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								required
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm h-11"
								placeholder="Password"
								onChange={({ target }) =>
									setPassword(target.value)
								}
								value={password}
							/>
						</div>
					</div>

					<div className="text-sm text-center flex justify-between flex-col items-center">
						<button
							type="button"
							onClick={() =>
								setAvatar(generator.generateRandomAvatar())
							}
							className="bg-white text-indigo-600 hover:text-indigo-700 w-full rounded h-11 font-bold border"
						>
							Generate avatar
						</button>
						<div>
							{avatar !== "" ? (
								<Image
									className="max-h-60 -mt-2"
									alt="avatar"
									src={avatar}
								/>
							) : null}
						</div>
					</div>

					{!isInvalid && avatar !== "" && (
						<div>
							<button
								type="submit"
								className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								<span className="absolute left-0 inset-y-0 flex items-center pl-3">
									<LockClosedIcon
										className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
										aria-hidden="true"
									/>
								</span>
								Sign Up
							</button>
						</div>
					)}

					<div className="text-sm text-center font-medium">
						<p>
							Already have an account?{` `}
							<span className="text-indigo-600 hover:text-indigo-500">
								<Link href="/sign-in">Sign In</Link>
							</span>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
