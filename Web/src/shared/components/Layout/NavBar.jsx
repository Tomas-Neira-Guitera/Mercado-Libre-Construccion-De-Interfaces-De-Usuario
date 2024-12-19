import { Link } from "react-router-dom";
import { SearchInput } from "./searchInput";
import { SessionNavBar } from "./SessionNavBar";

function NavBar() {
	return (
		<header className="bg-primary w-full h-16 px-6 py-2.5 flex justify-between items-center">
			<div className="flex items-center">
				<Link to={"/"}>
					<img
						src="/src/shared/logos/meli/mercado-libre-logo.png"
						className="w-32 h-auto"
					/>
				</Link>
				<div className="relative flex items-center w-96 ml-28">
					<SearchInput />
				</div>
			</div>
			<div className="flex text-black items-center space-x-3">
				<Link to="/categories">
					Categorías
				</Link>
				<span className="right-8 h-6 bg-slate-800 w-0.5" />
				<SessionNavBar />
			</div>
		</header>
	);
}

export default NavBar;
