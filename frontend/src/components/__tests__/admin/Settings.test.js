import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router} from "react-router-dom";
import AuthContext from '../../admin/context/AuthContext'
import Settings from '../../admin/Settings';

beforeEach( () => {
    render(
        <Router>
            <AuthContext.Provider value={{user: { name: 'testname', email: 'testemail' }, logoutUser: function logoutUser(){}}}>
                <Settings/>
            </AuthContext.Provider>
        </Router>
    )
})

it('renders admin information update form', () => {
    expect(screen.getByText(/email/i)).toBeInTheDocument()
    expect(screen.getByText(/username/i)).toBeInTheDocument()
    expect(screen.getByText(/^(password)$/i)).toBeInTheDocument()
    expect(screen.getByText(/old password/i)).toBeInTheDocument()
    expect(screen.getByText(/new password/i)).toBeInTheDocument()
    expect(screen.getByText(/verify password/i)).toBeInTheDocument()
})

it('renders submit buttons', () => {
    expect(screen.getByRole('button', {  name: /save changes/i})).toBeInTheDocument()
    expect(screen.getByRole('button', {  name: /save/i})).toBeInTheDocument()
})