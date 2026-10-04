class ResponseFormatter{
    static success(statusCode=200 , data, message="Success"){
        return{
            success:true,
            statusCode,
            data,
            message,
            timestamp: new Date().toISOString(),

        }

    }
    static error(statusCode=500 , error=null, message="Failed"){
        return{
            success:false,
            statusCode,
            error,
            message,
            
            timestamp: new Date().toISOString(),
            
        }

    }
    static validationError(error=null){
        return{
            success:false,
            error,
            
            message:"validation failed",
            statusCode:400,
            timestamp: new Date().toISOString(),
            
        }

    }
    static paginated(data=null , page,limit,total){
        return{
            success:false,
            data,
            pagination:{
                page,
                limit,
                total,
                totalPages: Math.ceil(total/limit)
            },
           
            timestamp: new Date().toISOString(),
            
        }

    }
}

export default ResponseFormatter;