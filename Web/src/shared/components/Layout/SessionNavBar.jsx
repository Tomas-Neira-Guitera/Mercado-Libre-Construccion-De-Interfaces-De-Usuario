import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthUser } from "../../../services/user.service";
import { getCart } from "../../../services/cart.service";

export const SessionNavBar = () => {
	const [user, setUser] = useState(null);
	const jwt = localStorage.getItem("jwt");
	const [cartQuantity, setCartQuantity] = useState(0);

	const fetchCartQuantity = async () => {
		const cart = await getCart();
		setCartQuantity(cart.items.length);
	};

	useEffect(() => {
		if (jwt) {
			getAuthUser()
				.then((res) => setUser(res))
				.catch((err) => {
					if (err.status === 404) {
						localStorage.removeItem("jwt");
						setUser(null);
					}
				});
			fetchCartQuantity();
			
		}
	}, [jwt]);

	return (
		<div className="space-x-4">
			{user ? (
				<>
					<Link to={"/user"}>{user.name}</Link>
					<Link to={"/cart"} className="relative">
						<span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
							{cartQuantity}
						</span>

						<i className="bi bi-cart"></i>
					</Link>
				</>
			) : (
				<>
					<Link to={"/register"}>Creá tu cuenta</Link>
					<Link to={"/login"}>Ingresá</Link>
				</>
			)}
		</div>
	);
};

export default SessionNavBar;
