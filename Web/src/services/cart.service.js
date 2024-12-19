import axiosInstance from "./axiosConfig";

export const getCart = async () => {
	const token = localStorage.getItem("jwt");
	const res = await axiosInstance.get("/cart", {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};

export const updateCart = async (productId, amount) => {
	const token = localStorage.getItem("jwt");
	const res = await axiosInstance.put(
		"/cart",
		{ productId, amount },
		{
			headers: {
				Authorization: token,
			},
		}
	);
	return res.data;
};

export const removeProductCart = async (productId) => {
	const token = localStorage.getItem("jwt");
	const res = await axiosInstance.delete(`/cart/${productId}`, {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};

export const purchaseCart = async (cardNumber, expirationDate, cvv, name) => {
	const token = localStorage.getItem("jwt");

	const res = await axiosInstance.post(
		"/purchase",
		{
			cardNumber: cardNumber.toString(),
			expirationDate: expirationDate.toString(),
			cvv: cvv.toString(),
			name: name.toString(),
		},
		{
			headers: {
				Authorization: token,
			},
		}
	);

	return res.data;
};
