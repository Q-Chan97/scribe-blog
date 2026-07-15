declare namespace Express {
    interface Request {
        token?: string | undefined
        user?: User
    }
    interface User {
        id: number
        username: string
        email: string
    }
}