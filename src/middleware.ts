import { NextRequest, NextResponse } from 'next/server';
import { JWTPayload, jwtVerify } from 'jose';


interface Payload extends JWTPayload {
    id: string
}

const decryptJwtToken = async (token: string): Promise<Payload | null> => {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    try {

        const { payload } = await jwtVerify(token, secret);
        return payload as Payload

    } catch (error) {
        return null
    }
}


export const middleware = async (req: NextRequest) => {
    const response = NextResponse.next()
    const token = req.cookies.get('token')?.value
    if (!token) return response

    const payload = await decryptJwtToken(token)

    const isTokenExpired = payload?.exp  && payload?.exp < Date.now()/ 1000

    if (!payload || isTokenExpired){
        response.cookies.delete('token')
        return response
    }

    response.headers.set('x-user-id',payload.id)
    return response
}

export const config = {
    matcher: [
        '/',
        '/auth/:path*' // Match all paths under /auth
    ]
}