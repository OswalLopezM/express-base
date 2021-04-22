import { Response } from 'express';
import { ResponseStatusCode } from './ResponseStatusCode';

export function successResponse(message: string, DATA: any, res: Response) {
    res.status(ResponseStatusCode.success).json({
        STATUS: 'SUCCESS',
        MESSAGE: message,
        DATA
    });
}

export function failureResponse(message: string, DATA: any, res: Response) {
    res.status(ResponseStatusCode.success).json({
        STATUS: 'FAILURE',
        MESSAGE: message,
        DATA
    });
}

export function invalidJWTResponse(message: string, res: Response) {
    res.status(ResponseStatusCode.success).json({
        STATUS: 'Invalid JWT',
        MESSAGE: 'Invalid JWT',
        message: message
    });
}

export function insufficientParameters(res: Response) {
    res.status(ResponseStatusCode.bad_request).json({
        STATUS: 'FAILURE',
        MESSAGE: 'Insufficient parameters',
        DATA: {}
    });
}

export function mongoError(err: any, res: Response) {
    res.status(ResponseStatusCode.internal_server_error).json({
        STATUS: 'FAILURE',
        MESSAGE: 'MongoDB error',
        DATA: err
    });
}
