import InputForm from "@/components/shared/input-form";
import SubmitBtn from "@/components/shared/submit-btn";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CategoryType } from "@/types/category";
import { Save } from "lucide-react";
import Form from "next/form";
import React from "react";

interface ProductFormProps {
  categories: CategoryType;
}

const ProductForm = ({ categories }: ProductFormProps) => {
  console.log(categories);
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">
          Product Information
        </CardTitle>
        <CardDescription>Enter the details of your new product</CardDescription>
      </CardHeader>

      <Form action="" className="flex flex-col gap-4">
        <CardContent className="flex flex-col gap-6">
          {/* Basic Information */}
          <div className="flex flex-col gap-4">
            <h3 className="font-medium">Basic Information</h3>

            {/* Product Title */}
            <div className="flex flex-col gap-2">
              <InputForm
                label="Product Title"
                id="title"
                placeholder="Enter product title"
                required
              />
              {/* Error Message */}
            </div>

            {/* Product Description */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter description product"
                className="min-h-20"
              />
              {/* Error Message */}
            </div>

            {/* Category Selection */}
            <div className="flex flex-col gap-2">
              <Label>
                Category<span className="text-red-500">*</span>
              </Label>
              <Select name="category-id">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories
                    .filter((c) => c.status === "Active")
                    .map((c, index) => (
                      <SelectItem key={index} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="flex flex-col gap-4">
            <h3 className="font-medium">Pricing Information</h3>
            <div>Input</div>
          </div>

          {/* Stock Information */}
          <div className="flex flex-col gap-4">
            <h3 className="font-medium">Stock Information</h3>
            <div>Input</div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitBtn name="Save Product" icon={Save} className="w-full" />
        </CardFooter>
      </Form>
    </Card>
  );
};

export default ProductForm;
