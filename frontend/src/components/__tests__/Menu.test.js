import { render, screen } from '@testing-library/react'
import Menu from '../Menu'

it('renders order button', () => {
    render(<Menu />)
    const order = screen.getByRole('button', { name: /order/i })
    expect(order).toBeInTheDocument()
})

it('redirects to foxcity listing in play store when order button is clicked', () => {
    render(<Menu />)
    expect(screen.getByRole('button', { name: /order/i })).toHaveAttribute('href', 'https://play.google.com/store/apps/details?id=com.foxcity.foxcitycustomer&hl=en&gl=US');
})
