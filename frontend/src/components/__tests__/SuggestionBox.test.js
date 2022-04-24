import { render, screen } from '@testing-library/react'
import SuggestionBox from '../SuggestionBox'

beforeEach(() => {
    render(<SuggestionBox />)
})

it('renders featured product heading', () => {
    expect(screen.getByRole('heading', {  name: /send us your feedback\/suggestions!/i})).toBeInTheDocument()
})

it('renders customer name input box', () => {
    expect(screen.getByPlaceholderText('Name (optional)')).toBeInTheDocument()
})

it('renders customer email input box', () => {
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument()
})

it('renders customer message input box', () => {
    expect(screen.getByPlaceholderText('Tell us something')).toBeInTheDocument()
})