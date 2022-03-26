import { render, screen } from '@testing-library/react'
import SuggestionBox from '../SuggestionBox'


it('renders featured product heading', () => {
    render(<SuggestionBox />)
    expect(screen.getByRole('heading', {  name: /send us your feedback or suggestions!/i})).toBeInTheDocument()
})

it('renders customer name input box', () => {
    render(<SuggestionBox />)
    expect(screen.getByPlaceholderText('Name (optional)')).toBeInTheDocument()
})

it('renders customer email input box', () => {
    render(<SuggestionBox />)
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument()
})

it('renders customer message input box', () => {
    render(<SuggestionBox />)
    expect(screen.getByPlaceholderText('Tell us something')).toBeInTheDocument()
})