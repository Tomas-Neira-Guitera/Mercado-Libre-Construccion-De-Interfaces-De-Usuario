import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/register/page"
import LoginPage from "./pages/login/page";
import CategoriesPage from "./pages/categories/page";
import CategoryPage from "./pages/categories/[id]/page";
import CartPage from "./pages/cart/page";
import ProductsPage from "./pages/products/page";
import { AuthUserPage } from "./pages/user/page";
import SearchPage from "./pages/search/searchPage";
import NewProductPage   from "./pages/products/newProduct/page";
import EditProductPage from "./pages/products/editProduct/page";
import PageNotFound from "./pages/notFound/page";
import "./App.css";
import ProductDetailPage from "./pages/products/[id]/page";
import Layout from "./shared/components/Layout/Layout";
import PurchasePage from "./pages/purchase/page";




const App = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route index element={<ProductsPage />} />
					<Route path="/products" element={<ProductsPage />} />
					<Route path="/products/:id" element={<ProductDetailPage/>} />
					<Route path="/newProduct" element={<NewProductPage />} />
					<Route path="/editProduct/:id" element={<EditProductPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/categories" element={<CategoriesPage />} />
					<Route path="/categories/id" element={<CategoryPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/categories/:id" element={<CategoryPage />} />
					<Route path="/user" element={<AuthUserPage />} />
					<Route path ="/search" element={<SearchPage />} />
					<Route path="/pageNotFound" element={<PageNotFound/>} />
					<Route path="/purchase" element={<PurchasePage/>} />
					
				</Routes>
			</Layout>
		</BrowserRouter>
	);
};

export default App;
