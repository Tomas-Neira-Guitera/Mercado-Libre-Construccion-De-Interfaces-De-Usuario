import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SearchInput = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (search.trim()) { 
			navigate(`/search?q=${search}`);
		}
		window.location.reload();	
	};



	return (
		<form onSubmit={(e) => {handleSubmit(e,search)}} className="relative flex items-center"  >
			<input
				type="text"
				className="borderbg-white shadow-md w-[30rem] h-8 pl-2 "
				placeholder="Buscar productos, marcas y más..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<span className="absolute right-8 h-6 bg-gray-400 w-0.5 mr-2" />
			<button
				className="absolute right-3 text-gray-500"
				style={{
					fontSize: "1.2rem",
					top: "50%",
					transform: "translateY(-50%)",
				}}
				type="submit"
			>
			<Search size={24} />
			</button>
		</form>
	);
};
