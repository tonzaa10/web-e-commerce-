import { db } from '@/lib/db'

export const getCategoies = async () => {

    try {
       return await db.category.findMany({
            select: {
                id: true,
                name: true,
                status: true
            }
        })

      
    } catch (error) {
        console.error('Error getting categories data :', error)
        return []
    }
}