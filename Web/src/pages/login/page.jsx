import { loginUser } from "../../services/user.service";
import FormInput from "../../shared/components/formInput";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
	const [email, setEMail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const trimmedEmail = email.trim();
		const trimmedPassword = password.trim();

		if (!trimmedEmail || !trimmedPassword) {
			setError("Fields cannot be empty");
			return;
		}

		try {
			await loginUser({ email, password });
			navigate("/");
			window.location.reload();
		} catch (error) {
			if (error.response && error.response.data) {
				setError(error.response.data.title);
			} else {
				setError("An unexpected error has occurred.");
			}
		}
	};

	return (
		<div className="page-card w-[44rem]">
			<div className="flex flex-col justify-center items-center">
				<form
					onSubmit={(e) => handleSubmit(e, email, password)}
					className="w-full flex flex-col items-center space-y-3"
				>
					<h1 className="font-normal text-3xl text-center">Login</h1>
					<FormInput
						label="Email"
						placeholder="Enter your email"
						type="email"
						value={email}
						onChange={(e) => setEMail(e.target.value)}
					/>
					<FormInput
						label="Password"
						placeholder="Enter your password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error && <p className="text-red-500 font-s ">{error}</p>}
					<button
						className="w-[5rem] h-[2.5rem] primary-button"
						type="submit"
					>
						Login
					</button>
					<Link to="/register" className="text-info hover:underline">
						Create new Account
					</Link>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
