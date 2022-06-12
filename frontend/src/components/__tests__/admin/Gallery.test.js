import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router} from "react-router-dom";
import Gallery from '../../admin/Gallery'
import AuthContext from '../../admin/context/AuthContext'

beforeEach( () => {
    render(
        <Router>
            <AuthContext.Provider value={function logoutUser(){}}>
                <Gallery/>
            </AuthContext.Provider>
        </Router>
    )
})

it('renders admin gallery heading', () => {
    expect(screen.getByRole('heading', {  name: /gallery/i})).toBeInTheDocument()
})

it('renders admin gallery table column headers', async () => {
    expect(await screen.findByRole('columnheader', {  name: /id/i})).toBeInTheDocument()
    expect(await screen.findByRole('columnheader', {  name: /image/i})).toBeInTheDocument()
    expect(await screen.findByRole('columnheader', {  name: /action/i})).toBeInTheDocument()
})

it('renders admin gallery rows', async () => {
    expect(await screen.findByRole('cell', {  name: /1/i})).toBeInTheDocument()
    expect(await screen.findByRole('cell', {  name: /2/i})).toBeInTheDocument()
    expect(await screen.findByRole('cell', {  name: /3/i})).toBeInTheDocument()
    expect(await screen.findByRole('cell', {  name: /4/i})).toBeInTheDocument()
    expect(screen.getAllByRole('img', {  name: /galleryimg/i}).length).toBe(4)
    expect(screen.getAllByRole('button', {  name: /delete icon/i}).length).toBe(4)
})