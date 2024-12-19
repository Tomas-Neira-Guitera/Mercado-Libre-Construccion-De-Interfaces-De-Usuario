import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaymentInformation from "./components/PaymentInformation";

const PurchasePage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("jwt");
		if (!token) {
			navigate("/login");
		}
	}, [navigate]);

	return (
		<div>
			<PaymentInformation/>
		</div>
	);
};

export default PurchasePage;
