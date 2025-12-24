
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['Admin' , 'Manager' , 'Employee'],
        default : 'Employee'
    }
});

const User = mongoose.model('userTbl',userSchema);

export default User;