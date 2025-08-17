import { getCategoies } from '@/features/categories/db/categories'
import ProductForm from '@/features/products/components/product-form'
import React from 'react'

const NewProductPage = async () => {

    const categories = await getCategoies()

    return (
        <div className="p-4 sm:p-6 space-y-6">
            <div className='flex flex-col gap-1'>
                <h1 className='text-2xl md:text-3xl font-bold'>Add New Product</h1>
                <p className='text-muted-foreground text-sm'>Create a new product</p>
            </div>

            <ProductForm categories={categories} />

        </div>
    )
}

export default NewProductPage