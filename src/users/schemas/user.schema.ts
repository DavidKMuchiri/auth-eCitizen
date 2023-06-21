import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id_number: {type: String, required: true},

    email: {type: String, required: true},

    active: {type: Boolean, required: true},

    first_name: {type: String, required: true},

    last_name: {type: String, required: true},

    surname: {type: String, required: true},

    account_type: {type: String, required: true},

    mobile_number: {type: String, required: true},

    mobile_verified: {type: Boolean, required: true},

    gender : {type: String, required: true},

})
