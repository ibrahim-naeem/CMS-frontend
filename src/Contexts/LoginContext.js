import {useState, createContext, useReducer} from 'react';
export const LoginContext = createContext();

const loginReducer = (state, action) =>{
    switch(action.type){
        case 'SET_AUTH':
            return {...state, isAuthenticated: !state.isAuthenticated}
        default:
            return state;
    }
}


export const LoginContextProvider = ({children})=>{
    const[isAuthenticated, setIsAuthenticated] = useState(true)
    const [state, dispatch] = useReducer(loginReducer, {
        email: '',
        password: '',
        isAuthenticated: true
    })

    return(
        <LoginContext.Provider value={{...state,dispatch, isAuthenticated, setIsAuthenticated}}>
            {children}  
        </LoginContext.Provider>
    )
}