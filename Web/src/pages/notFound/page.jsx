import { Link } from "react-router-dom";

const PageNotFound = () => {

	return (
		<div className="page-card w-[40rem] h-[30rem] flex flex-col items-center justify-center">
			<h1 className="text-4xl pb-4">Oops! Something went wrong.</h1>
			<Link to="/" className="primary-button h-10 pt-2">
				Return Home
			</Link>
		</div>
	);
};

export default PageNotFound;
