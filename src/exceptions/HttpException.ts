export class HttpException extends Error{
    description: string
    status: number
    errorcOde?: string


    constructor(description: string, errorCode:string, status = 500){
        super(description)
        Object.setPrototypeOf(this,new.target.prototype)

        this.description = description
        this.status = status
        this.errorcOde = errorCode
        Error.captureStackTrace(this)
    }

}