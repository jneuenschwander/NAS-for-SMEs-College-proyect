import jwt from 'jsonwebtoken';

const encodeUser = (payload: any): string => {
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret')
}

export {
    encodeUser
}