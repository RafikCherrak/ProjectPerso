import Joi from "joi"
import BaseDTO from "./BaseDTO"


export default class LoginRequestDTO extends BaseDTO {
public email :string
public password: string

constructor(obj :{email:string, password: string}){
    super(obj)

    this.email = obj.email
    this.password = obj.password


    this.schema = Joi.object({
        email:Joi.string().required(),
        password: Joi.string().required(),
    })
    this.validate()
}
public static from(obj: {email: string, password: string}): LoginRequestDTO{
    return new LoginRequestDTO(obj)
}
}