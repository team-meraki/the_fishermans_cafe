import { render, screen } from '@testing-library/react'
import Menu from '../Menu'

beforeEach(() => {
    render(<Menu />)
})

it('renders order button', () => {
    expect(screen.getByTestId('order-button')).toBeInTheDocument()
})

it('redirects to foxcity listing in play store when order button is clicked', () => {
    expect(screen.getByTestId('order-button')).toHaveAttribute('href', 'https://play.google.com/store/apps/details?id=com.foxcity.foxcitycustomer&hl=en&gl=US')
})

it('renders product category buttons', () => {
    expect(screen.getByRole('button', {name: /meals/i})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /desserts/i})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /drinks/i})).toBeInTheDocument()
})

it('shows just the meal category products at first mount', async () => {
    const products = await screen.findAllByTestId('product-card')
    expect(products.length).toBe(2)
    expect(await screen.findByText(/product1/i)).toBeInTheDocument()
    expect(await screen.findByText(/999.00/i)).toBeInTheDocument()
    expect(await screen.findByText(/product3/i)).toBeInTheDocument()
    expect(await screen.findByText(/199.25/i)).toBeInTheDocument()
})

