import React from "react";
import InputProdForm from "./InputProdForm";

const ProductDetails = ({
	title,
	setTitle,
	price,
	setPrice,
	shipping,
	setShipping,
	description,
	setDescription,
	stock,
	setStock,
	category,
	setCategory,
	categories,
}) => (
	<div className="flex justify-between space-x-10">
		{/* Left */}
		<div className="flex flex-col">
			<InputProdForm
				label="Title"
				type="text"
				placeholder="Enter title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<InputProdForm
				label="Price"
				type="number"
				placeholder="Enter price"
				value={price}
				onChange={(e) => {setPrice(e.target.value)}}
			/>
			<InputProdForm
				label="Shipping"
				type="number"
				placeholder="Enter shipping"
				value={shipping}
				onChange={(e) => setShipping(e.target.value)}
			/>
		</div>
		<div className="flex flex-col">
				<InputProdForm
					className ="textarea"
					label="Description"
					type="text"
					placeholder="Enter description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<InputProdForm
					label="Stock"
					type="number"
					placeholder="Enter quantity"
					value={stock}
					onChange={(e) => setStock(e.target.value)}
				/>
			<div className="relative w-96 h-14 gap-2 pb-[65px]">
				<h2 className="text-left mb-2 text-black opacity-90 h-5 text-base">
					Category
				</h2>
				<select
					className={`border shadow-sm w-full h-8 pr-10 bg-transparent ${
						category ? "text-black" : "text-gray-400"
					}`}
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				>
					<option className="text-gray-400" value="" disabled selected>
						Select
					</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
				<div className="absolute right-8 top-11 transform -translate-y-1/2 translate-x-1 border-r h-6 border-gray-300"></div>
			</div>
		</div>
	</div>
);
export default ProductDetails;
