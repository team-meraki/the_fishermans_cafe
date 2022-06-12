import { render, screen } from '@testing-library/react'
import Gallery from '../Gallery'

beforeEach(() => {
    render(<Gallery />)
})

it('renders gallery heading', () => {
    expect(screen.getByRole('heading', { name: /Explore our space/i })).toBeInTheDocument()
})

it('renders review instances from customers', async () => {
    const images = await screen.findAllByAltText(/the fishermans cafe/i)
    expect(images.length).toBe(4)
})