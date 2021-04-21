import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../common/Responses';
import { IUser } from '../models/IUser';
import UserService from '../services/UserService';
import e = require('express');

export class UserController {

    private userService: UserService = new UserService();

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

    public getUser(req: Request, res: Response) {
        if (req.params.id) {
            const userFilter = { _id: req.params.id };
            this.userService.filterUser(userFilter, (err: any, userData: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get user successfull', userData, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public updateUser(req: Request, res: Response) {
            const userFilter = { id: req.params.id };
            this.userService.filterUser(userFilter, (err: any, userData: IUser) => {
                if (err) {
                    mongoError(err, res);
                } else if (userData) {
                    const userParams: IUser = {
                        _id: req.params.id,
                        firstName: req.body.firstName ? req.body.firstName : userData.firstName,
                        lastName: req.body.lastName ? req.body.lastName : userData.lastName,
                        email: req.body.email ? req.body.email : userData.email,
                        password: req.body.password ? req.body.password : userData.password
                    };
                    this.userService.updateUser(userParams, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update user successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid user', null, res);
                }
            });
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