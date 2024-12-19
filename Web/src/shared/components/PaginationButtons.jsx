import { Link } from "react-router-dom";

export const PaginationButtons = ({ page, currentPage, totalPages, pathname, queryParam }) => {
	return (
		<div className="flex justify-center mt-4 text-xl">
			<Link to={{ pathname: pathname, search: queryParam ? `${queryParam}&page=${currentPage - 1}` : `page=${currentPage - 1}` }} reloadDocument>
				<button
					className={page === 1 ? "text-gray-400" : "text-black"}
					disabled={page === 1}
				>
					{"<"}
				</button>
			</Link>
			{` ${currentPage} de ${totalPages} `}
			<Link to={{ pathname: pathname, search: queryParam ? `${queryParam}&page=${currentPage + 1}` : `page=${currentPage + 1}` }} reloadDocument>
				<button
					className={page === totalPages ? "text-gray-400" : "text-black"}
					disabled={page === totalPages}
				>
					{">"}
				</button>
			</Link>
		</div>
	);
};