import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import Link from "next/link"


const ProductList = () => {
    return (
        <>
            <Card>
                <CardContent className='pb-4'>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
                        <CardTitle className='text-lg sm:text-xl'>Products</CardTitle>
                        <Button asChild>
                            <Link href='/admin/products/new'>
                                <Plus size={16} />
                                <span>Add Product</span>
                            </Link>
                        </Button>
                    </div>

                    <Tabs>
                        <TabsList className='grid grid-cols-4 mb-4'>
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="acive">Active</TabsTrigger>
                            <TabsTrigger value="inactive">Inactive</TabsTrigger>
                            <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
                        </TabsList>

                        <div className='flex flex-col sm:flex-row gap-4 justify-between items-center mb-4'>
                            <div className='flex gap-2'>
                                <Badge variant='outline' className='sm:px-3 py-1'>
                                    <span className='font-semibold text-blue-600'>0</span> Total
                                </Badge>
                                <Badge variant='outline' className='sm:px-3 py-1'>
                                    <span className='font-semibold text-blue-600'>0</span> Total
                                </Badge>
                                <Badge variant='outline' className='sm:px-3 py-1'>
                                    <span className='font-semibold text-blue-600'>0</span> Total
                                </Badge>
                                <Badge variant='outline' className='sm:px-3 py-1'>
                                    <span className='font-semibold text-blue-600'>0</span> Total
                                </Badge>
                            </div>
                            <div>Search</div>
                        </div>
                    </Tabs>
                </CardContent>
            </Card>
        </>
    )
}

export default ProductList