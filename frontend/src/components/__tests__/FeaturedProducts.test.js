import { render, screen } from '@testing-library/react'
import FeaturedProducts from '../FeaturedProducts'


it('renders see more button', () => {
    render(<FeaturedProducts />)
    const seeMore = screen.getByRole('button', {  name: /see more/i})
    expect(seeMore).toBeInTheDocument()
})

it('renders featured product heading', () => {
    render(<FeaturedProducts />)
    const productsHeading = screen.getByRole('heading', {  name: /on the menu/i})
    expect(productsHeading).toBeInTheDocument()
})

it('loads product cards fetched from database', async () => {
    render(<FeaturedProducts />)
    expect(await screen.findByText('product1')).toBeInTheDocument()
    expect(await screen.findByText('999.00')).toBeInTheDocument()
    expect(await screen.findByText('product2')).toBeInTheDocument()
    expect(await screen.findByText('25.00')).toBeInTheDocument()
    expect(await screen.findByText('product3')).toBeInTheDocument()
    expect(await screen.findByText('199.25')).toBeInTheDocument()
    expect(await screen.findByText('product4')).toBeInTheDocument()
    expect(await screen.findByText('50.00')).toBeInTheDocument()
})