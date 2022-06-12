import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router} from "react-router-dom";
import AllProducts from '../../admin/AllProducts'
import AuthContext from '../../admin/context/AuthContext'

beforeEach( () => {
    render(
        <Router>
            <AuthContext.Provider value={function logoutUser(){}}>
                <AllProducts/>
            </AuthContext.Provider>
        </Router>
    )
})

it('renders admin product category filter', () => {
    expect(screen.getByRole('heading', {  name: /filter by category:/i})).toBeInTheDocument()
})

it('renders admin product table column headers', async () => {
    expect(await screen.findByRole('columnheader', {  name: /name/i})).toBeInTheDocument()
    expect(await screen.findByRole('columnheader', {  name: /price/i})).toBeInTheDocument()
    expect(await screen.findByRole('columnheader', {  name: /last modified/i})).toBeInTheDocument()
    expect(await screen.findByRole('columnheader', {  name: /action/i})).toBeInTheDocument()
})

it('renders admin product rows', async () => {
    expect(await screen.findByRole('cell', {  name: /php 999\.00/i})).toBeInTheDocument()
    expect(await screen.findByRole('cell', {  name: /product2/i})).toBeInTheDocument()
    expect(await screen.findByRole('cell', {  name: /php 25\.00/i})).toBeInTheDocument()
    expect(await screen.findByRole('cell', {  name: /product3/i})).toBeInTheDocument()
    expect(await screen.findByRole('cell', {  name: /php 199\.25/i})).toBeInTheDocument()
    expect(await screen.findByRole('cell', {  name: /product4/i})).toBeInTheDocument()
    expect(await screen.findByRole('cell', {  name: /php 50\.00/i})).toBeInTheDocument()
    expect(await screen.findByRole('cell', {  name: /product5/i})).toBeInTheDocument()
    expect(await screen.findByRole('cell', {  name: /php 199\.00/i})).toBeInTheDocument()
    expect(screen.getAllByRole('img', {  name: /product-img/i}).length).toBe(5)
    expect(screen.getAllByRole('button', {  name: /delete icon/i}).length).toBe(5) 
    expect(screen.getAllByRole('button', {  name: /edit icon/i}).length).toBe(5)
})