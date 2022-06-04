import { render, screen } from '@testing-library/react'
import FeaturedProducts from '../FeaturedProducts'

beforeEach(() => {
    render(<FeaturedProducts />)
})

it('renders featured product heading', () => {
    const productsHeading = screen.getByRole('heading', {name:/on the menu/i})
    expect(productsHeading).toBeInTheDocument()
})

it('loads product cards fetched from database', async () => {
    expect(await screen.findByText(/product1/i)).toBeInTheDocument()
    expect(await screen.findByText(/999.00/i)).toBeInTheDocument()
    expect(await screen.findByText(/product2/i)).toBeInTheDocument()
    expect(await screen.findByText(/25.00/i)).toBeInTheDocument()
    expect(await screen.findByText(/product3/i)).toBeInTheDocument()
    expect(await screen.findByText(/199.25/i)).toBeInTheDocument()
    expect(await screen.findByText(/product4/i)).toBeInTheDocument()
    expect(await screen.findByText(/50.00/i)).toBeInTheDocument()
})