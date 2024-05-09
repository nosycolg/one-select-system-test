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
    response.badRequest = (errorCode?: string) => {
        return response.status(400).send(errorCode || '')
    }

    response.notFound = (errorCode?: string) => {
        return response.status(404).send(errorCode || '')
    }

    response.success = (data?: unknown) => {
        response.status(200)

        if (data) return response.send(data)

        return response.end()
    }

    next()
}