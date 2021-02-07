import {Response, Request} from "miragejs"
import {User} from '../../../Interfaces/User'
import {handleErrors} from '../server'
import {randomBytes} from "crypto";


const generateToken = () => randomBytes(8).toString("hex")

export interface authResponse  {
    token: string;
    user: User
}

const login = (schema: any , req: Request): authResponse | Response => {
    const { username, password } = JSON.parse(req.requestBody);
    const user = schema.users.findBy({username})
    if(!user){
        return handleErrors(null, "No user with this username exists")
    }
    if (password !== user.password){
        return handleErrors(null, "Your password is incorrect")
    }

    const token = generateToken();

    return {
        user: user.attrs as User,
        token,
    }
}

const signUp = (schema: any, req: Request): authResponse | Response => {
    const data = JSON.parse(req.requestBody);
    const exUser = schema.users.findBy({username: data.username})

    if(exUser){
        return handleErrors(null, "user with this username already exist")
    }

    const user = schema.users.create(data);
    const token = generateToken();
    
    return {
        user: user.attrs as User,
        token,
    }
}

export default { signUp, login }