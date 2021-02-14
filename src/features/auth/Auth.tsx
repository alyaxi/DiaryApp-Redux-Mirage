import React, {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {User} from "../../Interfaces/User";
// import * as Yup from "yup";
import http from "../../services/api";
import {saveToken, setAuthState} from "./authSlice";
import {setUser} from "./userSlice";
import {authResponse} from "../../services/mirage/Routes/user";

import { useAppDispatch } from "../../store";

// const schema = Yup.object().shape({
//     username: Yup.string()
//       .required('What? No username?')
//       .max(16, 'Username cannot be longer than 16 characters'),
//     password: Yup.string().required('Without a password, "None shall pass!"'),
//     email: Yup.string().email('Please provide a valid email address (abc@xy.z)'),
//   });

  const Auth: FC = () => {
    const { handleSubmit, register, errors } = useForm<User>();
  
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
  
    const submitForm = (data: User) => {
      const path = isLogin ? '/auth/login' : '/auth/signup';
      http
        .post<User, authResponse>(path, data)
        .then((res) => {
          if (res) {
            const { user, token } = res;
            dispatch(saveToken(token));
            dispatch(setUser(user));
            dispatch(setAuthState(true));
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    return(
        <div className="auth">
            <div className="card">
                <div><h1 style={{color: "#778899"}}>Login UP</h1></div>
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="inputWrapper">
                        <input ref={register} name="Username" placeholder="Username"/>
                        {errors && errors.username && (
                            <p className="error">{errors.username.message}</p>
                        )}
                    </div>
                    <div className="inputWrapper">
                        <input 
                        type="password"
                        name="password"
                        ref={register}
                        placeholder="Password"/>

                        {errors && errors.password && (
                            <p className="error">{errors.password.message}</p>
                        )}
                    </div>
                    {!isLogin && (
                        <div className="inputWrapper">
                            <input 
                            ref={register}
                            name="email"
                            placeholder="Email (optional) "/>
                            {errors && errors.email && (
                                <p className="error">{errors.email.message}</p>
                            )}
                        </div>
                    )}
                    <div className="inputWrapper">
                        <button type="submit" disabled={loading}>
                            {isLogin ? "Login" : "Create an account"}
                        </button>
                    </div>
                    <p onClick={() => setIsLogin(!isLogin)} style={{cursor: "pointer", opacity: 0.7}}>
                        {isLogin ? "No account? Create one" : "Already have an account"}
                    </p>
                </form>
            </div>
        </div>
    )
    };
   
export default Auth