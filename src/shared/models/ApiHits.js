import mongoose, { mongo }  from "mongoose";
import { validate } from "uuid";
import SecurityUtils from "../utils/SecurityUtils";

const apiHitSchema = new mongoose.Schema({
    eventId:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    timestamp:{
        type:Date,
        required:true,
    },
    serviceName:{
        type:String,
        required:true,
        index:true,
    },
    endpoint:{
        type:String,
        required:true,
        index:true,
    },
    method:{
        type:String,
        required:true,
        enum:['GET','POST','PUT','PATCH','DELETE','OPTIONS','HEAD'],

    },
    statusCode:{
        type:Number,
        required:true,
        index:true,
    },
    latencyMs:{
        type:Number,
        required:true,
    },
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Client',
        required:true,
        index:true,
    },
    apiKeyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ApiKey',
        required:true,
        index:true,
    },
    ip:{
        type: String,
        required: true,
        
    },
    
    userAgent:{
        type: String,
        required:true,
    },
    
    
    
},{
    timestamps: true,
    collection: "api_hits"
})


apiHitSchema.index({clientId: 1 , serviceName:1 ,endpoint: 1 , timestamp: -1 });
apiKeySchema.index({clientId: 1 ,timestamp:-1,statusCode: 1 });
apiKeySchema.index({apiKeyId: 1 ,timestamp: -1 });
apiKeySchema.index({timestamp: 1 },{expireAfterSeconds: 2592000 });
const ApiHit = mongoose.model("ApiHit" , apiHitSchema);
export default ApiHit;