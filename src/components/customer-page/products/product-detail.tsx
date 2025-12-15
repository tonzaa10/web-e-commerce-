import Image from "next/image";
import { formatPrice } from "@/lib/formatPrice";

const ProductDetail = ({ product }: { product: any }) => {
  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex flex-row gap-6 md:gap-12 max-w-7xl mx-auto px-4 xl:px-0 py-8 ">
      <div className="w-1/2">
        <div className="relative aspect-square w-full">
          <Image src={product.mainImage?.url || "/images/no-product-image.png"} alt={product.title} fill className="object-cover" />
        </div>
      </div>

      <div className="w-1/2">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="mt-2 text-lg">{formatPrice(product.price)}</p>
        <p className="mt-4 text-muted-foreground">{product.description}</p>
        {/* ปุ่ม add to cart, สต็อก, ตัวเลือก ฯลฯ */}
      </div>
    </div>
  );
};

export default ProductDetail;