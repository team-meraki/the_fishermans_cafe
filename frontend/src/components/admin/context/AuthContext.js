import { createContext, useState } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { useNavigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = () => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const baseURL = process.env.REACT_APP_API_BASE_URL
    const navigate = useNavigate()

    const loginUser = async (e)=> {
        e.preventDefault()
        axios.post(baseURL + 'api/token/', 
            { 
                username: e.target.username.value, 
                password: e.target.password.value
            }
        ).then(response => {
            setAuthTokens(response.data)
            setUser(jwt_decode(response.data.access))
            localStorage.setItem('authTokens', JSON.stringify(response.data))
        }).catch(error => {
            if (error.response.status === 401)
                toast.error('Incorrect credentials. Please try again.');
        })
    }

    let logoutUser = async (e) => {
        e.preventDefault()
        axios.post(baseURL + 'api/token/blacklist/', 
            { 
                refresh_token: authTokens.refresh
            }
        )
        
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let contextData = {
        user:user,
        authTokens:authTokens,
        setAuthTokens:setAuthTokens,
        setUser:setUser,
        loginUser:loginUser,
        logoutUser:logoutUser,
    }

    return(
        <AuthContext.Provider value={contextData}>
            <Outlet/>
        </AuthContext.Provider>
    )
}