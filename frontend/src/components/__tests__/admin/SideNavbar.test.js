import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router} from "react-router-dom";
import SideNavbar from '../../admin/SideNavbar'
import AuthContext from '../../admin/context/AuthContext'

beforeEach( () => {
    render(
        <Router>
            <AuthContext.Provider value={function logoutUser(){}}>
                <SideNavbar/>
            </AuthContext.Provider>
        </Router>
    )
})

it('renders admin sidenavbar header', () => {
    expect(screen.getByRole('img', {  name: /cafe logo/i})).toBeInTheDocument()
    expect(screen.getByRole('img', {  name: /brand name/i})).toBeInTheDocument()
})

it('renders admin sidenavbar links', () => {
    expect(screen.getByRole('img', {  name: /products icon/i})).toBeInTheDocument()
    expect(screen.getByRole('link', {  name: /products icon all products/i})).toBeInTheDocument()
    expect(screen.getByRole('img', {  name: /featured icon/i})).toBeInTheDocument()
    expect(screen.getByRole('link', {  name: /featured icon featured products/i})).toBeInTheDocument()
    expect(screen.getByRole('img', {  name: /gallery icon/i})).toBeInTheDocument()
    expect(screen.getByRole('link', {  name: /gallery icon gallery/i})).toBeInTheDocument()
    expect(screen.getByRole('img', {  name: /cafe icon/i})).toBeInTheDocument()
    expect(screen.getByRole('link', {  name: /cafe icon about the cafe/i})).toBeInTheDocument()
})

it('renders admin sidenavbar footer', async () => {
    expect(screen.getByRole('img', {  name: /logout icon/i})).toBeInTheDocument()
    expect(screen.getByRole('link', {  name: /logout icon log out/i})).toBeInTheDocument()
})