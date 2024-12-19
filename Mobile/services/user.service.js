import { getData, storeData } from "../utils/helper";
import axios from "./axiosConfig";

export const createUser = async ({ name, email, password, image }) => {
	const res = await axios.post("/register", { name, email, password, image });
	const token = res.headers["authorization"];
	if (token) {
		storeData("jwt", token);
	}

	return res.data;
};

export const loginUser = async ({ email, password }) => {
	const res = await axios.post("/login", { email, password });
	const token = res.headers["authorization"];
	if (token) {
		storeData("jwt", token);
	}
	return res.data;
};

export const getAuthUser = async () => {
	const token = await getData("jwt");
	const res = await axios.get("/user", {
		headers: {
			Authorization: token,
		},
	});
	return res.data;
};


export const toggleLike = async (productId) => {
	const token = await getData("jwt");
	const res = await axios.put(
		`/products/${productId}/like`,
		{},
		{
			headers: {
				Authorization: token,
			},
		}
	);
	return res.data;
};
