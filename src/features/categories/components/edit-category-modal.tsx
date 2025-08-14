import InputForm from "@/components/shared/input-form"
import Modal from "@/components/shared/modal"
import SubmitBtn from "@/components/shared/submit-btn"
import { CategoryType } from "@/types/category"
import { Save } from "lucide-react"
import Form from "next/form"

interface EditCategoryModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    category: CategoryType | null
}

const EditCategoryModal = ({ open, onOpenChange, category }: EditCategoryModalProps) => {
    return (

        <Modal open={open} onOpenChange={onOpenChange} title='Update Category' description='Update your category information'>
            <Form action='' className='space-y-4'>
                <input type='hidden' name='category-id' value={category?.id} />
                <div className='space-y-2'>
                    <InputForm
                        labal='Categroy name'
                        id='categroy-name'
                        placeholder='Enter category name'
                        required
                        defaultValue={category?.name}

                    />
                    {/* Error Message */}
                </div>

                <SubmitBtn name='Update Category' icon={Save} className='w-full' />
            </Form>
        </Modal>
    )
}

export default EditCategoryModal