import { Request, Response } from 'express';

declare global {
    namespace Express {
        interface Response {
            badRequest: (errorCode?: string, message?: string) => Response;
            notFound: (errorCode?: string, message?: string) => Response;
            success: (data?: unknown) => Response;
        }
    }
}
