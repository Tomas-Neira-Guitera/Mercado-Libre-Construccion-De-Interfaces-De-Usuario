import axiosInstance from "./axiosConfig";

export const getAllProducts = async (page) => {
	const response = await axiosInstance.get("/products", {
		params: {
			page: page,
		},
	});
	return response.data;
};

export const getProductById = async (id) => {
	const response = await axiosInstance.get(`/products/${id}`);
	return response.data;
};


export const getRelatedProducts = async (productId) => {
	const res = await axiosInstance.get(`/products/${productId}/related`);
	return res.data;
};

export const addQuestion = async (productId, question) => {
	const token = localStorage.getItem("jwt");
	const res = await axiosInstance.post(
		`/products/${productId}/question`,
		{ text: question },
		{
			headers: {
				Authorization: token,
			},
		}
	);
	return res.data;
};

export const addAnswer = async (productId, questionId, answer) => {
	const token = localStorage.getItem("jwt");
	const res = await axiosInstance.put(
		`/products/${productId}/question/${questionId}`,
		{ text: answer },
		{
			headers: {
				Authorization: token,
			},
		}
	);
	return res.data;
} 

export const newProduct = async ({title, description, price, images, stock, shipping, characteristics, categoryId:category}) => {
    
    const token = localStorage.getItem('jwt');

    const res = await axiosInstance.post("/products", 
        {
            title, 
            description, 
            price, 
            images,
            stock, 
            shipping, 
            characteristics,
            categoryId:category,  
        },
        {
            headers: {
                Authorization: token,
            }
        }
    );
    
    return res.data;    
};



export const updateProduct = async ({id, title, description, price, images, stock, shipping, characteristics, categoryId:category}) => {
    const token = localStorage.getItem('jwt');
    const res = await axiosInstance.put(`/products/${id}`, 
        {
            title, 
            description, 
            price, 
            images,
            stock, 
            shipping, 
            characteristics,
            categoryId:category,  
        },
        {
            headers: {
                Authorization: token,
            }
        }
    );
    return res.data;
}

export const search = async (text,page) => {
	const response = await axiosInstance.get("/search", {
        params: {
            query: text,
			page: page,
        },
    });
	return response.data;
};



































































