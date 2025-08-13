import { db } from '@/lib/db'
import {
    unstable_cacheLife as cacheLife,
    unstable_cacheTag as cacheTag
} from 'next/cache'
import { getCategoryGlobalTag } from './cache'

export const getCategoies = async () => {
    'use cache'

    cacheLife('days')
    cacheTag(getCategoryGlobalTag())

    try {
        return await db.category.findMany({
            orderBy: {createdAt: 'asc'},
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