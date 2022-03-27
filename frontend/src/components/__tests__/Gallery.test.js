import { render, screen } from '@testing-library/react'
import Gallery from '../Gallery'

it('renders gallery heading', () => {
    render(<Gallery />)
    expect(screen.getByRole('heading', { name: /Explore our space/i })).toBeInTheDocument()
})

it('renders inside/outside buttons', () => {
    render(<Gallery />)
    expect(screen.getByRole('button', { name: /inside/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /outside/i })).toBeInTheDocument()
})