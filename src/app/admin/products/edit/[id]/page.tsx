
interface EditProductPageProps {
    params: Promise<{ id: string }>
}

const EditProductPage = async ({ params }: EditProductPageProps) => {

    const { id } = await params

    return (
        <div>EditProductPage</div>
    )
}

export default EditProductPage