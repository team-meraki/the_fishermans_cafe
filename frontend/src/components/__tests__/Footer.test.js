import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

it('renders map', () => {
    render(<Footer />)
    const map = screen.getByTitle(/map of the fisherman's cafe/i);
    expect(map).toBeInTheDocument()
})

it('renders headings in footer', () => {
    render(<Footer />)
    const footerSections = screen.getAllByRole('heading')
    expect(footerSections.length).toBe(4)
})

it('renders cafe info', async () => {
    render(<Footer />)
    const facebookLink = await screen.findByRole('link', {  name: /facebook/i})
    expect(facebookLink).toBeInTheDocument()
    const schedule = await screen.findByText(/monday \- sunday 9:00 am \- 7:00 pm/i)
    expect(schedule).toBeInTheDocument()
    const location = await screen.findByText(/sts\. peter and paul parish, binaobao, bantayan island, cebu, philippines/i)
    expect(location).toBeInTheDocument()
    const contact = await screen.findByText(/09123456789/i)
    expect(contact).toBeInTheDocument()
})