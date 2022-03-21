import { waitFor, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NavBar from '../NavBar'
import Footer from '../Footer'
import { act } from 'react-dom/test-utils';

const MockHomePage = () => {
    return (
        <>
            <NavBar />
            <Footer />
        </>
    )
}

test('if customer can send suggestion', async () => {
    render(<MockHomePage />)
    global.alert = jest.fn()
    expect(screen.getByRole('heading', {  name: /what our customers are saying/i})).toBeInTheDocument()

    userEvent.type(screen.getByPlaceholderText('Name (optional)'), "Person4")
    userEvent.type(screen.getByPlaceholderText('Email address'), "person4@email.com")
    userEvent.type(screen.getByPlaceholderText('Tell us something'), "Tastes so good!")

    userEvent.click(screen.getByRole('button', {  name: /submit/i}))
    
    await waitFor(() => expect(alert).toHaveBeenCalledTimes(1))
})