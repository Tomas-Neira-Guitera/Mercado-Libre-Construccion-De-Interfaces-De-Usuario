import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EmptyCart from "./componets/EmptyCart";
import Cart from "./componets/Cart";
import { getCart } from "../../services/cart.service";

const CartPage = () => {
	const navigate = useNavigate();
	const [cart, setCart] = useState(null);
	const [updated, setUpdated] = useState(false);

	useEffect(() => {
		const jwt = localStorage.getItem("jwt");
		if (!jwt) {
			navigate("/login");
		}
	}, [navigate]);

	useEffect(() => {
		const fetchCart = async () => {
			const res = await getCart();
			setCart(res);
		};
		fetchCart();
	}, []);

	useEffect(() => {
		if (updated) {
			setUpdated(false);
			const fetchCart = async () => {
				const res = await getCart();
				setCart(res);
			};
			fetchCart();
		}
	}, [updated]);

	return (
		<div>
			{cart?.items.length > 0 ? <Cart cart={cart} setUpdated={setUpdated}/> : <EmptyCart />}
		</div>
	);
};

export default CartPage;
