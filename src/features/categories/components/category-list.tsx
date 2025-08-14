'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CategoryType } from '@/types/category'
import { MoreVertical, Pencil, Search, Trash2 } from 'lucide-react'
import EditCategoryModal from './edit-category-modal'
import { useState } from 'react'



interface CategoryListProps {
    categories: CategoryType[]
}


const CategroyList = ({ categories }: CategoryListProps) => {

const [isEditModal, setEditModal] =  useState(false)
const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)

const handleEditClick = (category:CategoryType) => {
    setSelectedCategory(category)
    setEditModal(true)
}
    
    return (
        <>
            <Card>
                <CardHeader className='pb-4'>
                    <CardTitle className='text-lg sm:text-xl'>Category List</CardTitle>
                    <Tabs>
                        <TabsList className='grid grid-cols-3 mb-4'>
                            <TabsTrigger value='all'>All Categories</TabsTrigger>
                            <TabsTrigger value='active'>Active</TabsTrigger>
                            <TabsTrigger value='inactive'>Inactive</TabsTrigger>
                        </TabsList>

                        <div className='relative'>
                            <Search size={16} className='absolute left-2 top-2.5 text-muted-foreground' />
                            <Input placeholder='Search categories...' className='pl-8' />
                        </div>
                    </Tabs>
                </CardHeader>
                <CardContent>
                    <div className='border rounded-md overflow-hidden'>
                        <div className='grid grid-cols-12 bg-muted py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium'>
                            <div className='col-span-1 hidden sm:block'>No.</div>
                            <div className='col-span-6 sm:col-span-5'>Category name</div>
                            <div className='col-span-2  text-center hidden sm:block'>Products</div>
                            <div className='col-span-3 sm:col-span-2 text-center'>Status</div>
                            <div className='col-span-3 sm:col-span-2 text-right'>Actions</div>
                        </div>
                    </div>

                    <ScrollArea className='h-[350px] sm:h-[420px]'>
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <div key={index} className='grid grid-cols-12 p-3 px-2 sm:px-4 border-t items-center hover:bg-gray-50 transition-colors duration-100 text-sm'>
                                    <div className='col-span-1 hidden sm:block'>{index + 1}.</div>
                                    <div className='col-span-6 sm:col-span-5 truncate pr-2'>{category.name}</div>
                                    <div className='col-span-2  text-center hidden sm:block'>0</div>
                                    <div className='col-span-3 sm:col-span-2 text-center'>
                                        <Badge variant={category.status === 'Active' ? 'default' : 'destructive'} className='px-1 sm:px-2'>
                                            {category.status}
                                        </Badge>
                                    </div>
                                    <div className='col-span-3 sm:col-span-2 text-right'>
                                        {/* Mobile Action */}
                                        <div className='flex justify-end gap-1 md:hidden'>
                                            <Button variant='ghost' size='icon' className='size-7' onClick={() => handleEditClick(category)}>
                                                <Pencil size={15} />
                                            </Button>
                                            <Button variant='ghost' size='icon' className='size-7'>
                                                <Trash2 size={15} />
                                            </Button>
                                        </div>
                                        {/* Desktop Action Buttons */}
                                        <div className='hidden md:block'>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant='ghost' size='icon' className='size-8'>
                                                        <MoreVertical size={16} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align='end'>
                                                    <DropdownMenuItem  onClick={() => handleEditClick(category)}>
                                                        <Pencil size={15} />
                                                        <span>Edit</span>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Trash2 size={15} className='text-destructive' />
                                                        <span className='text-destructive'>Delete</span>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='py-8 text-center text-muted-foreground text-xs'>No categories found matching your search</div>
                        )}

                    </ScrollArea>
                </CardContent>
            </Card>

            <EditCategoryModal  open={isEditModal} onOpenChange={setEditModal} category={selectedCategory} />

        </>
    )
}

export default CategroyList