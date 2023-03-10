import Joi from 'joi'
import jwt from 'jsonwebtoken'

const ACCOUNT_SID = process.env.ACCOUNT_SID as string;
const AUTH_TOKEN = process.env.AUTH_TOKEN as string;
const ADMIN_NUMBER = process.env.ADMIN_NUMBER as string;


export const createUserSchema = Joi.object().keys({
    email:Joi.string().trim().lowercase().required(),
    username: Joi.string().trim().lowercase().required(),
    interest:Joi.string().trim().lowercase().required(),
    phonenumber:Joi.string().required(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password:Joi.ref("password")
}).with('password', 'confirm_password')



export const userUpdateSchema = Joi.object().keys({
    email:Joi.string().trim().lowercase().required(),
    username: Joi.string().trim().lowercase().required(),
    interest:Joi.string().trim().lowercase().required(),
    phonenumber:Joi.string().required(),
    avatar:Joi.string().trim().required(),
})


export const loginUserSchema = Joi.object().keys({
    userInfo: Joi.string().trim().lowercase().required(),
    password:Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  
})
export const changePasswordSchema = Joi.object()
  .keys({
    password: Joi.string().required(),
    confirm_password: Joi.any()
      .equal(Joi.ref('password'))

      .required()

      .label('Confirm password')

      .messages({ 'any.only': '{{#label}} does not match' }),
  })
  .with('password', 'confirm_password');

//Generate Token
export const generateToken=(user:{[key:string]:unknown}):unknown=>{
  const pass = process.env.JWT_SECRET as string
   return jwt.sign(user,pass, {expiresIn:'7d'})
}





export const options ={  
    abortEarly:false,
    errors:{
        wrap:{
            label: ''
        }
    }
}