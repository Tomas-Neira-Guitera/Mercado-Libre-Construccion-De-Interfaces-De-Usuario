export const LogoutButton = () => {

	const handleClick = () => {
		localStorage.removeItem("jwt");
		window.location.reload();
	};

	return (
		<button
			onClick={handleClick}
			className="primary-button w-20 h-8"
		>
			Logout
		</button>
	);
};
