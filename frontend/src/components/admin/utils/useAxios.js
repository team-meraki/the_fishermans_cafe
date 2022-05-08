import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const baseURL = "http://127.0.0.1:8000"

const useAxios = () => {
    const {authTokens, setUser, setAuthTokens} = useContext(AuthContext)
    const navigate = useNavigate()

    const axiosInstance = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            Authorization: authTokens ? 'Bearer ' + authTokens.access : null,
            accept: 'application/json'
        }
    })

    axiosInstance.interceptors.request.use( 
        request => {
            return request
        }, 
        error => {
            return Promise.reject(error)
        }
    )

    axiosInstance.interceptors.response.use(
        response => {
            return response
        },
        async error => {
            const originalRequest = error.config
            const status = error.response ? error.response.status : null

            if(status === 401){
                return axios.post(baseURL + '/api/token/refresh/', {
                    refresh: authTokens.refresh
                })
                .then(response => {
                    localStorage.setItem('authTokens', JSON.stringify(response.data))
                    axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access
                    originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access
                    setAuthTokens(response.data)
                    setUser(jwt_decode(response.data.access))

                    return axiosInstance(originalRequest)
                })
                .catch(error => {
                    localStorage.removeItem('authTokens')
                    setAuthTokens(null)
                    setUser(null)

                    navigate('/admin', { replace: true })
                })
            }

            return Promise.resolve(error)
        }
    )

    return axiosInstance
}

export default useAxios