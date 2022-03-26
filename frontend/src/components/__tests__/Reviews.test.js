import { render, screen } from '@testing-library/react'
import Reviews from '../Reviews'


it('renders review heading', () => {
    render(<Reviews />)
    expect(screen.getByRole('heading', {  name: /what our customers are saying/i})).toBeInTheDocument()
})

it('renders review instances from customers', async () => {
    render(<Reviews />)
    expect(await screen.findByText('Good service!')).toBeInTheDocument()
    expect(await screen.findByText('Well done!')).toBeInTheDocument()
})