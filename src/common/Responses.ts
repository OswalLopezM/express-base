import { Response } from 'express';
import { ResponseStatusCode } from './ResponseStatusCode';

export function successResponse(message: string, data: any, res: Response) {
    res.status(ResponseStatusCode.success).json({
        status: 'SUCCESS',
        message: message,
        data
    });
}

export function failureResponse(message: string, data: any, res: Response) {
    res.status(ResponseStatusCode.success).json({
        status: 'FAILURE',
        message: message,
        data
    });
}

export function invalidJWTResponse(message: string, res: Response) {
    res.status(ResponseStatusCode.success).json({
        status: 'Invalid JWT',
        message: message
    });
}

export function insufficientParameters(res: Response) {
    res.status(ResponseStatusCode.bad_request).json({
        status: 'FAILURE',
        message: 'Insufficient parameters',
        data: {}
    });
}

export function mongoError(err: any, res: Response) {
    res.status(ResponseStatusCode.internal_server_error).json({
        status: 'FAILURE',
        message: 'MongoDB error',
        data: err
    });
}
