import mongoose, { mongo }  from "mongoose";
import { validate } from "uuid";
import SecurityUtils from "../utils/SecurityUtils";

const clientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength:2,
        maxlength: 100,
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
        match: /^[a-z0-9-]+$/,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
      
    },
    description:{
        type: String,
        maxlength: 500,
        default: '',
    },
    website:{
        type:String,
        default:'',
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    settings:{
        dataRetentionDays:{
            type:Number,
            default: 30,
            min: 7,
            max:365,
        },
        alertsEnabled:{
            type:Boolean,
            default: true,
        },
        timezone:{
            type:String,
            default: 'UTC',
        }
    }
   
    
},{
    timestamps: true,
    collection: "clients"
})


userSchema.index({isActive: 1 });

const Client = mongoose.model("Client" , clientSchema);
export default Client;