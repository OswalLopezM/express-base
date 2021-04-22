
import jsonwebtoken from 'jsonwebtoken'
import { NextFunction, Response, Request } from 'express'
import { invalidJWTResponse } from '../common/Responses';

function authenticateToken(request: Request, response: Response, next : NextFunction) {
    let authHeader = request.headers['authorization'];

    const token = authHeader.split(' ')[1];
    
    if (token == null) return invalidJWTResponse('Doesn\'t have authorization header',response)
    
    jsonwebtoken.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        console.log(err)
    
        if (err) return invalidJWTResponse(err.message, response);
    
        (request as any).user = user
    
        next()
    })
}

export default authenticateToken;