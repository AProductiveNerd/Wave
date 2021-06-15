import Head from "next/head";
import { LockClosedIcon } from "@heroicons/react/solid";
import { firebase } from "../libs/Firebase";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
	const router = useRouter();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	const [error, setError] = useState("");
	const isInvalid = password === "" || emailAddress === "";

	const handleLogin = async (event) => {
		event.preventDefault();

		try {
			await firebase
				.auth()
				.signInWithEmailAndPassword(emailAddress, password);
			router.push("/");
		} catch (error) {
			setEmailAddress("");
			setPassword("");
			setError(error.message);
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<Head>
				<title>Sign In | Wave</title>
			</Head>
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h1 className="text-6xl font-extrabold text-indigo-600">
						Wave
					</h1>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in to your account
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
					onSubmit={handleLogin}
				>
					<input type="hidden" name="remember" defaultValue="true" />
					<div className="rounded-md shadow-sm -space-y-px">
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
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
								className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								placeholder="Password"
								onChange={({ target }) =>
									setPassword(target.value)
								}
								value={password}
							/>
						</div>
					</div>
					{!isInvalid && (
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
								Sign in
							</button>
						</div>
					)}
				</form>
				<div className="text-sm text-center">
					{`Don't have an account? `}
					<span className="font-medium text-indigo-600 hover:text-indigo-500">
						<Link href="/sign-up">Sign Up</Link>
					</span>
				</div>
			</div>
		</div>
	);
}
