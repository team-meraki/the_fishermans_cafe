import React, { useContext } from 'react'
import { useLocation, Navigate, Outlet } from "react-router-dom"
import AuthContext from '../context/AuthContext'

const PrivateRoute = () => {
    const { user } = useContext(AuthContext)
    const location = useLocation() 
    return (
        user ? <Outlet/> : <Navigate to="/admin" state={{ from: location }} replace/>
    )
}

export default PrivateRoute
