import React from "react";

const ProductCharacteristics = ({
	characteristics,
	addCharacteristic,
	deleteCharacteristic,
	name,
	setName,
	value,
	setValue,
}) => (
	<form>
		<div className="flex flex-col space-y-2 mb-4">
			<h2 className="text-left text-black opacity-90 text-base">
				Characteristics
			</h2>
			<div className="flex items-center space-x-4 w-full">
				<input
					className="border shadow-sm h-8 px-2 w-[200px] flex-grow"
					type="text"
					placeholder="Enter Key"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					className="border shadow-sm h-8 px-2 w-[200px] flex-grow"
					type="text"
					placeholder="Enter Value"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<button
					type="button"
					onClick={addCharacteristic}
					className="w-[90px] h-[40px] rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-all"
				>
					Add
				</button>
			</div>
		</div>
		<div className="mt-4">
			<ul className="space-y-2">
				{characteristics.length === 0 ? (
					<p className="text-center text-gray-500 my-10">
						No characteristics added
					</p>
				) : (
					characteristics.map((item, index) => (
						<li key={index} className="flex justify-between items-center">
							<span className="text-gray-700">
								{item.name}: {item.value}
							</span>
							<button
								type="button"
								onClick={() => deleteCharacteristic(index)}
								className="text-blue-500 hover:underline text-sm ml-4"
							>
								Delete
							</button>
						</li>
					))
				)}
			</ul>
		</div>
	</form>
);

export default ProductCharacteristics;
