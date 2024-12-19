import axiosInstance from "./axiosConfig";  

export const getAllCategories = async () => {
    const response = await axiosInstance.get("/categories");
    return response.data;
};

export const getProductsByCategory = async (id) => {
    const response = await axiosInstance.get(`/categories/${id}`);
    return response.data;
};
