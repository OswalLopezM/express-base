import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../common/Responses';
import { IUser } from '../models/IUser';
import UserService from '../services/UserService';
import e = require('express');
import jsonwebtoken from 'jsonwebtoken';

export class UserController {

    private userService: UserService = new UserService();

    public async signIn(req: Request, res: Response){
        try {
            const query = { email: req.body.email, password: req.body.password };
            let user = await this.userService.getOne(query);
            if(user){
                let jwt= jsonwebtoken.sign({userId: user.id}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
                successResponse('Login successfull',{ user, jwt },res);
            }else{
                failureResponse('invalid Credentials', null, res);
            }
        }catch(e) {
            console.error(e.message)
            failureResponse('Internal server error', e.message, res);
        }
    }

    public createUser(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not 
        
            const userParams: IUser = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            };
            this.userService.createUser(userParams, (err: any, userData: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create user successfull', userData, res);
                }
            });
        
    }

    public async getUser(req: Request, res: Response) {
        if (req.params.id) {
            const userFilter = { _id: req.params.id };
            let user = await this.userService.getOne(userFilter);
            successResponse('Get successfull',user,res);
        } else {
            insufficientParameters(res);
        }
    }

    public async getAllUsers(req: Request, res: Response) {
            const userFilter = { };
            let user = await this.userService.getAll(userFilter);
            successResponse('Get successfull',user,res);
    }

    public updateUser(req: Request, res: Response) {
            const userFilter = { id: req.params.id };
            // this.userService.filterUser(userFilter, (err: any, userData: IUser) => {
            //     if (err) {
            //         mongoError(err, res);
            //     } else if (userData) {
            //         const userParams: IUser = {
            //             _id: req.params.id,
            //             firstName: req.body.firstName ? req.body.firstName : userData.firstName,
            //             lastName: req.body.lastName ? req.body.lastName : userData.lastName,
            //             email: req.body.email ? req.body.email : userData.email,
            //             password: req.body.password ? req.body.password : userData.password
            //         };
            //         this.userService.updateUser(userParams, (err: any) => {
            //             if (err) {
            //                 mongoError(err, res);
            //             } else {
            //                 successResponse('update user successfull', null, res);
            //             }
            //         });
            //     } else {
            //         failureResponse('invalid user', null, res);
            //     }
            // });
    }

    public deleteUser(req: Request, res: Response) {
        if (req.params.id) {
            this.userService.deleteUser(req.params.id, (err: any, deleteDetails: any) => {
                if (err) {
                    mongoError(err, res);
                } else if (deleteDetails.deletedCount !== 0) {
                    successResponse('delete user successfull', null, res);
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}