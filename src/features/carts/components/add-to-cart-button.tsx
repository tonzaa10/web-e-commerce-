"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useTransition } from "react";
import { addToCartAction } from "../actions/cart";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productId: string;
  stock: number;
  className?: string;
  children?: React.ReactNode;
}

const AddToCartButton = ({
  productId,
  stock,
  className,
  children,
}: AddToCartButtonProps) => {
  const [isPanding, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("product-id", productId);
      formData.append("conunt", "1");

      const result = await addToCartAction(formData);

      if (result && result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      className={className}
      onClick={handleAddToCart}
      disabled={stock <= 0 || isPanding}
    >
      <ShoppingCart size={16} />
      {children || "เพิ่มสินค้าลงตะกร้า"}
    </Button>
  );
};

export default AddToCartButton;
