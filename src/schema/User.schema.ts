import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
});

export default mongoose.model('users', schema);