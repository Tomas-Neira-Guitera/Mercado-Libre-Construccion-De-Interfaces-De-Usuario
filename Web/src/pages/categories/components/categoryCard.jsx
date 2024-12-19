import "../categoryStyle.css";

const CategoryCard = ({ categoryName, icon, onClick }) => {
	return (
		<div
			className="category-container"
			onClick={onClick}
		>
			<div className="icon-categories">{icon}</div>
			<h1 className="font-inter">{categoryName}</h1>
		</div>
	);
};

export default CategoryCard;
