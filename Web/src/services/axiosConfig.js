import axios from "axios";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
	baseURL: "/api",
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		if (error.response) {
			if (error.response.status === 500) {
				Swal.fire({
					title: "Error!",
					text: "Resource not found",
					icon: "error",
					confirmButtonText: "OK",
				});
			}
			return Promise.reject(error);
		}
	}
);

export default axiosInstance;
