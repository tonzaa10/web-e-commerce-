import ProductCard from "@/components/customer-page/products/product-card";
import { getFeatureProducts } from "@/features/products/db/products";

const Products = async () => {
  const products = await getFeatureProducts();
  return (
    <div className="flex flex-row gap-6 md:gap-12 max-w-7xl mx-auto px-4 xl:px-0 py-8 min-h-svh">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
