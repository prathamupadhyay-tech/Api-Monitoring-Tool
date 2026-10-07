import mongoose from "mongoose";
import config from "./index";
import logger from "./logger";


/**
 * MongoDB database Connector
 */
class MongoConnection{
    constructor(){
        this.connection = null;
    }
    /**
     * Connect to MongoDB
     * @returns {Promise<mongoose.Connection>}
     */
    async connect(){
        try{
            if(this.connection){
                logger.info("mongodb already connected");
                return this.connection;
            }

            await mongoose.connect(config.mongo.uri , {
                dbName: config.mongo.dbName,
            })
            this.connection = mongoose.connection;
            logger.info(`MongoDB connected : ${config.mongo.uri}` );
            this.connection.on("error" , err=>{
                logger.error("mongoDB connection error" , err)
            })
            this.connection.on("disconnected", ()=>{
                logger.error("mongoDB Disconnected")
            })

            return this.connection
        }catch(error){
            logger.error("failed to connect to mongodb: " , error);
            throw error;
        }
    }
    /**
     * this helps to disconnect from mongodb
     */
    async disconnect(){
        try {
            if(this.connection){
                await mongoose.disconnect();
                this.connection = null;
                logger.info("mongodb disconnected");
            }
        } catch (error) {
            logger.error("failed to disconnect to mongodb: " , error);
            throw error;
        }
    }
    /**
     * Get the active connection
     * @returns {mongoose.Connection}
     */
    getConnection(){
        return this.connection;
    }
}

export default new MongoConnection();