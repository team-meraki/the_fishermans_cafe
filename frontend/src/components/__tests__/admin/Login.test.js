import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router} from "react-router-dom";
import AuthContext from '../../admin/context/AuthContext'
import Login from '../../admin/Login';

beforeEach( () => {
    render(
        <Router>
            <AuthContext.Provider value={function logoutUser(){}}>
                <Login/>
            </AuthContext.Provider>
        </Router>
    )
})

it('renders admin login heading', () => {
    expect(screen.getByRole('heading', {  name: /admin login/i})).toBeInTheDocument()
})

it('renders login form', () => {
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument()
})