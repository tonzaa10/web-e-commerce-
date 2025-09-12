import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ProductType } from '@/types/product'
import { Divide } from 'lucide-react'
import Image from 'next/image'

import Link from 'next/link'


interface ProductCardProps {
    product: ProductType
}

const ProductCard = ({ product }: ProductCardProps) => {

    const discount = product.basePrice > product.price ? ((product.basePrice - product.price) / product.basePrice) * 100 : 0

    return (
        <Card className='group overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shado-md'>
            <Link href={`/products/${product.id}`}>
                <div className='relative pt-[100%] overflow-hidden bg-muted-foreground'>
                    {discount > 0 && (
                        <Badge className='absolute top-2 left-2 z-10 px-2 py-1'>
                            -{Math.round(discount)}%
                        </Badge>
                    )}

                    <div className='absolute inset-0 size-full transition-transform duration-500 group-hover:scale-105 '>
                        <Image alt={product.title} src={product.mainImage?.url || '/images/no-product-image.png'} fill className='object-cover' />
                    </div>
                    {product.stock <= 0 && (
                        <div className='absolute inset-0 flex items-center justify-center bg-black/50 z-10'>
                            <Badge variant='destructive' className='text-sm px-3 py-1'>สินค้าหมด</Badge>
                        </div>
                    )}
                </div>
            </Link>
            
        </Card>
    )
}

export default ProductCard