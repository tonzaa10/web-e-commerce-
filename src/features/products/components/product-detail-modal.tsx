import Modal from "@/components/shared/modal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductType } from "@/types/product";
import dayjs from "@/lib/dayjs";
import { Clock, DollarSign, FileText, Package, ShoppingBag, Tag } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatPrice } from "@/lib/formatPrice";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ProductDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductType | null;
}

const ProductDetailModal = ({
  open,
  onOpenChange,
  product,
}: ProductDetailModalProps) => {
  if (!product) {
    return null;
  }

  const formattedDate = dayjs(product.createdAt).fromNow();

  const stockColor = (() => {
    switch (true) {
      case product.stock <= 0:
        return "text-red-600";
      case product.stock <= product.lowStock:
        return "text-amber-500";
      default:
        return "text-green-600";
    }
  })();

  const stockStatus = (() => {
    switch (true) {
      case product.stock <= 0:
        return "Out of stock";
      case product.stock <= product.lowStock:
        return "Low stock";
      default:
        return "In stock";
    }
  })();

  const discount =
    product.basePrice > product.price
      ? (
        ((product.basePrice - product.price) / product.basePrice) *
        100
      ).toFixed(2)
      : "0";
  const porfitPerUnit = product.cost > 0 ? product.price - product.cost : 0;
  const porfitMargin =
    product.cost > 0
      ? ((porfitPerUnit / product.cost) * 100).toFixed(2)
      : "N/A";
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={product.title}
      description={`SKU: ${product?.sku}`}
      className="md:max-w-3xl"
    >
      <div>
        <Tabs>

          <TabsList className="grid grid-cols-3 mb-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="images">
              (Images{product.images.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ScrollArea className="max-h-[500px] overflow-y-auto">
              <Card className='mb-4'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                  {/* Main Image */}
                  <div className="relative aspect-square border rounded-md overflow-hidden group">
                    <Image
                      alt={product.title}
                      src={
                        product.mainImage?.url || "/images/no-product-image.png"
                      }
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  {/* Product Into */}
                  <div className="p-4 flex flex-col">
                    <div className="mb-2 flex items-center justify-between">
                      <Badge
                        variant={
                          product.status === "Active"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {product.status}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="flex items-center gap-1"
                      >
                        <Tag size={12} />
                        <span>{product.category.name}</span>
                      </Badge>
                    </div>
                    <h2 className="text-xl font-bold line-clamp-2 mb-1">
                      {product.title}
                    </h2>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <Clock size={12} />
                      <span>Added {formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Package size={16} />
                        <span className={`text-sm font-medium ${stockColor}`}>
                          {stockStatus}
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.stock} item Left
                      </span>
                    </div>
                    <div className="mt-auto">
                      <div className="flex flex-wrap items-baseline gap-2 mb-1">
                        <span>{formatPrice(product.price)}</span>
                        {product.basePrice > product.price && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs line-through text-muted-foreground">
                              {formatPrice(product.basePrice)}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {discount} % off
                            </Badge>
                          </div>
                        )}
                      </div>
                      {product.cost > 0 && (
                        <div className="flex gap-2 text-xs text-muted-foreground">
                          <span>Cost : {formatPrice(product.cost)}</span>
                          <span>•</span>
                          <span>
                            Profit : {formatPrice(porfitPerUnit)} (
                            {porfitMargin}%)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <CardContent className='p-4'>
                  <h3 className='text-sm font-semibold mb-2'>Sales statistics</h3>
                  <div className='grid grid-cols-3 gap-4'>
                    <div className="flex flex-col items-center justify-center bg-muted rounded-md p-2">
                      <ShoppingBag size={20} className="text-primary mb-1" />
                      <span className="font-bold">{product.sold}</span>
                      <span className="text-xs text-muted-foreground">Sales</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-muted rounded-md p-2">
                      <DollarSign size={20} className="text-emerald-500 mb-1" />
                      <span className="font-bold">{formatPrice(product.sold * product.price)}</span>
                      <span className="text-xs text-muted-foreground">Income</span>
                    </div>
                    <div className="flex flex-col items-center justify-center bg-muted rounded-md p-2">
                      <FileText size={20} className="text-amber-500" />
                      <span className="font-bold">{product.cost > 0 ? formatPrice(product.sold * (product.price - product.cost)) : 'N/A'}</span>
                      <span className="text-xs text-muted-foreground">Profit</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </ScrollArea>
          </TabsContent>

          <TabsContent value="details">
            <ScrollArea className="max-h-[500px] overflow-y-auto">
              <Card className="break-all">
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold">Product Detail</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-semibold mb-2">Spaecific information</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <h2 className="text-muted-foreground">SKU</h2>
                        <p className="font-medium">{product.sku}</p>
                      </div>
                      <div>
                        <h2 className="text-muted-foreground">Category</h2>
                        <p className="font-medium">{product.category.name}</p>
                      </div>
                      <div>
                        <h2 className="text-muted-foreground">Status</h2>
                        <Badge variant={product.status === 'Active' ? 'default' : 'destructive'}>{product.status}</Badge>
                      </div>
                      <div>
                        <h2 className="text-muted-foreground">Stock</h2>
                        <p className={`font-medium ${stockColor}`}>{product.stock}</p>
                      </div>
                      <div>
                        <h2 className="text-muted-foreground">Base Price</h2>
                        <p className="font-medium">{formatPrice(product.basePrice)}</p>
                      </div>
                      <div>
                        <h2 className="text-muted-foreground">Sale Price</h2>
                        <p className="font-medium">{formatPrice(product.price)}</p>
                      </div>
                      <div>
                        <h2 className="text-muted-foreground">Discount</h2>
                        <p className="font-medium">{discount}%</p>
                      </div>
                      <div>
                        <h2 className="text-muted-foreground">Created at</h2>
                        <p className="font-medium">{dayjs(product.createdAt).format('ll')}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />
                  <div>
                    <h4 className='text-sm font-semibold mb-2'>Sales information</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Total sales</TableHead>
                          <TableHead>Income</TableHead>
                          <TableHead>Total cost</TableHead>
                          <TableHead>Profit</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>{product.sold} items</TableCell>
                          <TableCell>{formatPrice(product.sold * product.price)}</TableCell>
                          <TableCell>{formatPrice(product.sold * product.cost)}</TableCell>
                          <TableCell>{formatPrice(product.sold * (product.price - product.cost))}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="images">Images</TabsContent>

        </Tabs>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
