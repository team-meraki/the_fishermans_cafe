import { render, screen } from '@testing-library/react'
import About from '../About'

beforeEach(() => {
    render(<About/>)
})

it('renders about description', async () => {
    expect(screen.getByRole('heading', {  name: /who we are/i})).toBeInTheDocument()
    expect(await screen.findByText(/this is a description/i)).toBeInTheDocument() 
})

it('renders about announcement', async () => {
    expect(screen.getByRole('heading', {  name: /announcement/i})).toBeInTheDocument()
    expect(await screen.findByText(/this is an announcement/i)).toBeInTheDocument() 
})

it('renders about table accom', async () => {
    expect(screen.getByRole('heading', {  name: /table accommodation/i})).toBeInTheDocument()
    expect(await screen.findByText(/this provides table accommodation/i)).toBeInTheDocument() 
})

it('renders about delivery info', async () => {
    expect(screen.getByRole('heading', {  name: /delivery/i})).toBeInTheDocument()
    expect(await screen.findByText(/this provides delivery info/i)).toBeInTheDocument() 
})