import { IUser } from '../models/IUser';
import users from '../schema/User.schema';

export default class UserService {
    
    public createUser(user_params: IUser, callback: any) {
        const _session = new users(user_params);
        _session.save(callback);
    }

    public async getOne(query: any) {
        return await users.findOne(query).exec();
    }

    public async getAll(query: any) {
        return users.find(query).exec();
    }

    public updateUser(user_params: IUser, callback: any) {
        const query = { _id: user_params._id };
        users.findOneAndUpdate(query, user_params, callback);
    }
    
    public deleteUser(_id: String, callback: any) {
        const query = { _id: _id };
        users.deleteOne(query, callback);
    }

}