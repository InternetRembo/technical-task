import React from "react";
import LoginForm from "./LoginForm";

const LoginPage = ( ) => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
			<div className="bg-white rounded-lg shadow-md w-[480px] min-h-[200px] ">
				<h1 className={"pt-3 px-3 text-center text-4xl"}>Sign in</h1>
				<LoginForm/>
			</div>
		</div>
	);
};

export default LoginPage;