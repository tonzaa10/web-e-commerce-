import { db } from '@/lib/db';
import { unstable_cacheLife as cacheLife, 
    unstable_cacheTag as cacheTag 
} from 'next/cache';
import { getUserGlobalTag } from './cache';

export const getUserById = async (id: string) => {
    'use cache'

    cacheLife('hours'); // Cache for 5 minutes
    cacheTag(await getUserGlobalTag(id)); // Cache tag for user

    try {

        const user = await db.user.findUnique({
            where: { id, status: 'Active' },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                address: true,
                picture: true,
                tel: true,
            },
        })
        console.log('user', user);
        return user;
    } catch (error) {
        console.error('Enter getting user by id', error);
        return null;
    }
}