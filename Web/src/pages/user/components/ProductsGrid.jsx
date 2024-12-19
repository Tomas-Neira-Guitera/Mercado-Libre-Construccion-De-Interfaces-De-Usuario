import ProductCard from "../../../shared/components/ProductCard"

export const ProductsGrid = ({ products, user }) => {
    
    if(products.length === 0){
        return <p>No products to show</p>
    }

    return (
        <div className="grid grid-cols-3 gap-4">
            {products.map((product, index) => {
                return <ProductCard key={index} product={product} user={user}/>;
            })}
        </div>
    );
}