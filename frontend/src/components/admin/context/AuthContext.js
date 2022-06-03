import { createContext, useState } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { Outlet } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = () => {
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const baseURL = 'https://cafe-backend.azurewebsites.net/'

    const loginUser = async (username, password)=> {
        return axios.post(baseURL + 'api/token/', { username, password })
        .then(response => {
            setAuthTokens(response.data)
            setUser(jwt_decode(response.data.access))
            localStorage.setItem('authTokens', JSON.stringify(response.data))
            return Promise.resolve(response)
        }).catch(error => {
            return Promise.reject(error)
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