import React, { createContext, useReducer } from "react";
import jwtdecode from 'jwt-decode'

const initialState = {
    user : null
}

if(localStorage.getItem('jwtToken')){
    //token stores and expiration time
    const decodedtoken = jwtdecode(localStorage.getItem('jwtToken'))
    //expiration time stored from date string
    if(decodedtoken.exp * 1000< Date.now()){
        localStorage.removeItem("jwtToken")
    }else{
        initialState.user = decodedtoken;
    }
}

const AuthContext = createContext({
  user: null,
  login: (userdata) => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state; 
  }
};
const AuthProvider = (props) => {
    const [state,dispatch] = useReducer(authReducer,initialState)
    const login = (userdata) => {
      localStorage.setItem('jwtToken',userdata.token)
      console.log(localStorage.getItem('jwtToken'));
        dispatch({
            type:'LOGIN',
            payload : userdata
        })
    }
    const logout = () => {
        localStorage.removeItem('jwtToken')
        dispatch({
            type:'LOGOUT'
        })
    }
    return (
        <AuthContext.Provider value={{user : state.user,login,logout}}
        {...props}/>
    )
}
export {AuthContext,AuthProvider}