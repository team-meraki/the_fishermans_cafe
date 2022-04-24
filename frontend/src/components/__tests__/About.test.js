import { render, screen } from '@testing-library/react'
import About from '../About'

it('renders about description', async () => {
    render(<About/>)
    expect(screen.getByRole('heading', {  name: /who are we/i})).toBeInTheDocument()
    expect(await screen.findByText(/this is a description/i)).toBeInTheDocument() 
})

it('renders about announcement', async () => {
    render(<About/>)
    expect(screen.getByRole('heading', {  name: /announcement/i})).toBeInTheDocument()
    expect(await screen.findByText(/this is an announcement/i)).toBeInTheDocument() 
})

it('renders about table accom', async () => {
    render(<About/>)
    expect(screen.getByRole('heading', {  name: /table accomodation/i})).toBeInTheDocument()
    expect(await screen.findByText(/this provides table accommodation/i)).toBeInTheDocument() 
})

it('renders about delivery info', async () => {
    render(<About/>)
    expect(screen.getByRole('heading', {  name: /delivery/i})).toBeInTheDocument()
    expect(await screen.findByText(/this provides delivery info/i)).toBeInTheDocument() 
})