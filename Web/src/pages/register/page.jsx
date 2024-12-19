import { useState } from "react";
import FormInput from "../../shared/components/formInput";
import { createUser } from "../../services/user.service";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [image, setImage] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!name || !email || !password || !image) {
			setError("All fields are required.");
			return;
		}
		try {
			await createUser({ name, email, password, image });
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
		<div className="page-card w-[44rem] h-[29rem]">
			<div className="flex flex-col justify-center items-center">
				<form
					onSubmit={handleSubmit}
					className="w-full flex flex-col items-center space-y-3"
				>
					<h1 className="font-normal text-3xl">Register</h1>
					<FormInput
						label="Name"
						placeholder="Enter your name"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<FormInput
						label="Email"
						placeholder="Enter your email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<FormInput
						label="Password"
						placeholder="Enter your password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<FormInput
						label="Image"
						placeholder="Enter your image"
						type="url"
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>
					{error && <p className="text-red-500">{error}</p>}
					<button className="w-[8.5rem] h-[2.5rem] mt-4 primary-button" >
						Create account
					</button>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;
