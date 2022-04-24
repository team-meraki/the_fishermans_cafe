import { render, screen } from '@testing-library/react'
import Gallery from '../Gallery'

it('renders gallery heading', () => {
    render(<Gallery />)
    expect(screen.getByRole('heading', { name: /Explore our space/i })).toBeInTheDocument()
})

it('renders review instances from customers', async () => {
    render(<Gallery />)
    const images = await screen.findAllByTestId('gallery-img')
    expect(images.length).toBe(4)
})