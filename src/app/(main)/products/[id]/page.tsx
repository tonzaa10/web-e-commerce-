import React from "react";
import { notFound } from "next/navigation";
import { getProductById } from "@/features/products/db/products"; // ปรับ path ตามจริง
import ProductDetail from "@/components/customer-page/products/product-detail"; // หรือที่เก็บ component คุณ

interface PageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ProductPage = async ({ params }: PageProps) => {
  const { id } = params;

  // ดึงข้อมูลสินค้าจาก DB / API ตาม id (getProductById ต้องเป็น async)
  const product = await getProductById(id);

  if (!product) {
    // ถ้าไม่พบสินค้า ให้แสดง 404
    notFound();
  }

  return <ProductDetail product={product} />;
};

export default ProductPage;
