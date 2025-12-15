import React from "react";
import { notFound } from "next/navigation";
import { getProductById } from "@/features/products/db/products";
import ProductDetail from "@/components/customer-page/products/product-detail";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ProductPage = async ({ params }: PageProps) => {
  const { id } = await params; // ✅ ต้อง await

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
};

export default ProductPage;
