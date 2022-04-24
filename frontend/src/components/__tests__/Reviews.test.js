import { render, screen } from '@testing-library/react'
import Reviews from '../Reviews'

beforeEach(() => {
    render(<Reviews />)
})

it('renders review heading', () => {
    expect(screen.getByRole('heading', {  name: /what our customers are saying/i})).toBeInTheDocument()
})

it('renders review instances from customers', async () => {
    expect(await screen.findByText('Good service!')).toBeInTheDocument()
    expect(await screen.findByText('Well done!')).toBeInTheDocument()
})