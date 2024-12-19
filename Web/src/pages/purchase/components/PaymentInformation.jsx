import { useNavigate } from "react-router-dom";
import { getCart, purchaseCart } from "../../../services/cart.service";
import FormInput from "../../../shared/components/formInput";
import PurchaseSummary from "./PurchaseSummarybis";
import { useEffect, useState } from "react";

const PaymentInformation = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [cvv, setCvv] = useState("");
	const [expirationDate, setExpirationDate] = useState("");
	const [cart, setCart] = useState(null);
	const [error, setError] = useState(null);

	const handleNameChange = (e) => setName(e.target.value);
	const handleCardNumberChange = (e) => setCardNumber(e.target.value);
	const handleCvvChange = (e) => setCvv(e.target.value);
	const handleExpirationDate = (e) => setExpirationDate(e.target.value);

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		if (!name || !/^[a-zA-Z\s]*$/.test(name)) {
			setError("The name is not valid.");
			return;
		}
		if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
			setError("The card number is incorrect. It must have 16 numbers.");
			return;
		}
		if (!cvv || !/^\d{3}$/.test(cvv)) {
			setError("The securty code is incorrect. It must have 3 numbers.");
			return;
		}
		if (!expirationDate || !/^\d{4}\/\d{2}$/.test(expirationDate)) {
			setError("The expiration date is incorrect. The format must be YYYY/MM.");
			return;
		}

		try {
			await purchaseCart(
				cardNumber.toString(),
				expirationDate.toString(),
				cvv.toString(),
				name.toString()
			);
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

	const fetchCart = async () => {
		try {
			const cart = await getCart();
			setCart(cart);
		} catch (error) {
			if (error.response && error.response.data) {
				setError(error.response.data.title);
			}
		}
	};

	useEffect(() => {
		fetchCart();
	}, []);

	return (
		<div className="flex space-x-4">
			<div className="page-card">
				<h2 className="font-normal text-2xl text-black-600 pb-4">
					Elegí cómo pagar
				</h2>
				<hr className="my-4 border-gray-300 w-full" />

				<div className="flex flex-col justify-center items-center">
					<form
						className="w-full flex flex-col items-left space-y-3"
						onSubmit={handleSubmit}
					>
						<FormInput
							label="Name"
							placeholder="Enter your name"
							type="text"
							onChange={handleNameChange}
							value={name}
						/>
						<FormInput
							label="Card Number"
							placeholder="Enter your card number without spaces"
							type="text"
							onChange={handleCardNumberChange}
							maxLength="16"
							value={cardNumber}
						/>
						<FormInput
							label="CVV"
							placeholder="Enter your CVV"
							type="text"
							onChange={handleCvvChange}
							maxLength="3"
							value={cvv}
						/>
						<FormInput
							label="Expiration Date"
							placeholder="YYYY/MM"
							type="text"
							maxLength="7"
							onChange={handleExpirationDate}
							value={expirationDate}
						/>
						{error && <p className="text-red-500">{error}</p>}
						<button
							className="w-[34rem] h-[2.5rem] primary-button m-5"
							type="submit"
						>
							Comprar
						</button>
					</form>
				</div>
			</div>
			<div className="page-card w-[25rem] h-[13rem]">
				<PurchaseSummary cart={cart} />
			</div>
		</div>
	);
};

export default PaymentInformation;
