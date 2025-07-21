import { User } from '@prisma/client'

export type UserType = Omi<User, 'passwor' | 'prictureID' | 'cratedAt' | 'updatedAt'>;