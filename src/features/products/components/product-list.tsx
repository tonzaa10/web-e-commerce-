import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Eye, MoreVertical, Pencil, Plus, RefreshCcw, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductList = () => {
    return (
        <>
            <Card>
                <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <CardTitle className="text-lg sm:text-xl">Products</CardTitle>
                        <Button asChild className="mb-4">
                            <Link href="/admin/products/new">
                                <Plus size={16} />
                                <span>Add Product</span>
                            </Link>
                        </Button>
                    </div>

                    <Tabs>
                        <TabsList className="grid grid-cols-4 mb-4">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="acive">Active</TabsTrigger>
                            <TabsTrigger value="inactive">Inactive</TabsTrigger>
                            <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
                        </TabsList>

                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-4">
                            <div className="flex gap-2">
                                <Badge variant="outline" className="sm:px-3 py-1">

                                    <span className="font-semibold text-blue-600">0</span> Total
                                </Badge>
                                <Badge variant="outline" className="sm:px-3 py-1">
                                    <span className="font-semibold text-green-600">0</span> Active
                                </Badge>
                                <Badge variant="outline" className="sm:px-3 py-1">
                                    <span className="font-semibold text-gary-500">0</span>{" "}
                                    Inactive
                                </Badge>
                                <Badge variant="outline" className="sm:px-3 py-1">
                                    <span className="font-semibold text-amber-500">0</span> Low
                                    Stock
                                </Badge>
                            </div>
                            <div className="relative w-full sm:w-64">
                                <Search
                                    size={16}
                                    className="absolute left-2 top-2.5 text-muted-foreground"
                                />
                                <Input placeholder="Search products..." className="pl-8" />
                            </div>
                        </div>
                    </Tabs>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Aciton</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Image
                                        alt="main product image"
                                        src="/images/no-product-image.png"
                                        width={40}
                                        height={40}
                                        className="object-cover rounded-md"
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">P1</div>
                                    <div className="text-xs text-muted-foreground">No SKU</div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">C1</div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">100</div>
                                    <div className="text-xs line-through text-muted-foreground">200</div>
                                </TableCell>
                                <TableCell>
                                    <div className={cn('text-sm', {
                                        'text-amber-500 font-medium': true
                                    })}>50</div>
                                </TableCell>
                                <TableCell>
                                    <Badge>Active</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant='ghost' size='icon' className="size-8">
                                                <MoreVertical size={16} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Eye size={15} />
                                                <span>View</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Pencil size={15} />
                                                <span>Edit</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            {true ? (
                                                <DropdownMenuItem>
                                                    <Trash2 size={15} className="text-destructive" />
                                                    <span className="text-destructive">Delete</span>
                                                </DropdownMenuItem>
                                            ) : (
                                                <DropdownMenuItem>
                                                    <RefreshCcw size={15} className="text-green-600" />
                                                    <span className="text-green-600">Restore</span>
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
};

export default ProductList;
