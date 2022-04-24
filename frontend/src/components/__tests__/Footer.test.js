import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

beforeEach(() => {
    render(<Footer />)
})

it('renders map', () => {
    expect(screen.getByTitle(/map of the fisherman's cafe/i)).toBeInTheDocument()
})

it('renders headings in footer', () => {
    expect(screen.getAllByRole('heading').length).toBe(4)
})

it('renders cafe info', async () => {
    const facebookLink = await screen.findByTestId('fb-link')
    expect(facebookLink).toBeInTheDocument()
    const schedule = await screen.findByText(/monday \- sunday 9:00 am \- 7:00 pm/i)
    expect(schedule).toBeInTheDocument()
    const location = await screen.findByText(/sts\. peter and paul parish, binaobao, bantayan island, cebu, philippines/i)
    expect(location).toBeInTheDocument()
    const contact = await screen.findByText(/09123456789/i)
    expect(contact).toBeInTheDocument()
})