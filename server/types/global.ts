import { Request, Response, NextFunction } from 'express'

import { User } from 'database/models/User'

export type Route = (req: Request, res: Response, next: NextFunction) => void

export type UserRequest = Request & {
    user: User
}

export type GraphQLRequest = Request & {
    user: {
        user: User
        role: 'user'
    }
}

export type GraphQLContext = {
    req: GraphQLRequest
    res: Response
    role: 'user'
}

export type GraphQLResolverContext = {
    res: Response
    user: User
    role: 'user'
}

export type ProtectedRoute = (req: UserRequest, res: Response, next: NextFunction) => void

export type MulterRequest = Request & {
    file: Express.Multer.File
    allowedExtenstionsError: boolean
    sizeLimit: boolean
}

export type MulterRoute = (req: MulterRequest, res: Response, next: NextFunction) => void
