import CategoryCard from "./components/categoryCard";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../services/categories.service";
import { iconForCategory, nameForCategory } from "../../shared/utils/helper";



const CategoriesPage = () => {
	const [categories, setCategories] = useState([]);
	const navigate = useNavigate();


    const fetchCategories = async () => {
        const data = await getAllCategories();
        setCategories(data);
    };

	const handleCategoryClick = (id) => {
		navigate(`/categories/${id}`);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<div className="p-2">

			<h1 className="text-3xl font-inter text-left mb-3">Categories</h1>
			
			<div className="grid grid-cols-4 gap-2">
				{categories.map((category) => {
					return (
						<CategoryCard
							key={category.id}
							categoryName={nameForCategory(category.name)}
							icon={iconForCategory(category.name)}
							onClick={() => handleCategoryClick(category.id)}
							
						/>
					);
				})}
			</div>
		
		</div>
	);
};

export default CategoriesPage;
