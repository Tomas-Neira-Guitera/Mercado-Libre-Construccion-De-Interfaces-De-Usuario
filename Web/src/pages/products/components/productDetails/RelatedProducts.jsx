import { useEffect, useState } from "react";
import { ProductsGrid } from "../../../user/components/ProductsGrid";
import { getRelatedProducts } from "../../../../services/product.service";


export const RelatedProducts = ({productId, user}) => {
    const [products, setProducts] = useState([]);

    useEffect( () => {
        const fetchRelatedProducts = async () => {
            const data = await getRelatedProducts(productId);
            setProducts(data);
        }
        fetchRelatedProducts();
    }, [productId]);

    return(
        <div className="page-card px-6 py-6">
            <div>
                <p className="text-3xl" >Productos relacionados</p>
                <hr className="line my-4" />
            </div>
            <ProductsGrid products={products} user={user}/>
        </div>
    )

}