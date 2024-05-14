import { NextFunction, Request, Response } from "express"

declare global {
    namespace Express {
        interface Response {
            badRequest: (errorCode?: string) => void;
            notFound: (errorCode?: string) => void;
            success: (data?: unknown) => void;
        }
    }
}

export default (request: Request, response: Response, next: NextFunction) => {
    response.badRequest = (errorCode?: string, message?: string) => {
        return response.status(400).json({ error: { code: errorCode, message: message } })
    }

    response.notFound = (errorCode?: string, message?: string) => {
        return response.status(404).json({ error: { code: errorCode, message: message } })
    }

    response.success = (data?: unknown) => {
        response.status(200)

        if (data) return response.json(data)

        return response.end()
    }

    next()
}