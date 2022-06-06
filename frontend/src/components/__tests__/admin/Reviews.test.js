import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router} from "react-router-dom";
import Reviews from '../../admin/Reviews'
import AuthContext from '../../admin/context/AuthContext'

beforeEach( () => {
    render(
        <Router>
            <AuthContext.Provider value={function logoutUser(){}}>
                <Reviews/>
            </AuthContext.Provider>
        </Router>
    )
})

it('renders admin gallery heading', () => {
    expect(screen.getByRole('heading', {  name: /Reviews/i})).toBeInTheDocument()
})

it('renders admin gallery table column headers', async () => {
    expect(await screen.findByRole('columnheader', {  name: /name/i})).toBeInTheDocument()
    expect(await screen.findByRole('columnheader', {  name: /email/i})).toBeInTheDocument()
    expect(await screen.findByRole('columnheader', {  name: /message/i})).toBeInTheDocument()
    expect(await screen.findByRole('columnheader', {  name: /action/i})).toBeInTheDocument()
})

it('renders admin gallery rows', async () => {
    expect(await screen.findByRole('cell', {  name: /^(Person1)$/i})).toBeInTheDocument()
    expect(await screen.findByRole('cell', {  name: /^(Person2)$/i})).toBeInTheDocument()
    expect(await screen.findByRole('cell', {  name: /^(Person3)$/i})).toBeInTheDocument()
    expect(await screen.findByRole('cell', {  name: /person1@email.com/i})).toBeInTheDocument()
    expect(await screen.findByRole('cell', {  name: /person2@email.com/i})).toBeInTheDocument()
    expect(await screen.findByRole('cell', {  name: /person3@email.com/i})).toBeInTheDocument()
})