import { CategoriesDisplay } from "./categoriesDisplay";

export const iconForCategory = (categoryName) => {
	return CategoriesDisplay[categoryName]?.icon || "Icon not found";
};

export const nameForCategory = (categoryName) => {
	return CategoriesDisplay[categoryName]?.categoryName || "Category not found";
};
