import { render, screen } from '@testing-library/react';
import NavBar from '../NavBar';
import { BrowserRouter as Router } from 'react-router-dom';

beforeEach(() => {
  render(
    <Router>
      <NavBar />
    </Router>
  )
})

it('renders navbar', () => {
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});

it('renders nav links', () => {
  expect(screen.getByRole('link', {name: /menu/i})).toBeInTheDocument();
  expect(screen.getByRole('link', {name: /gallery/i})).toBeInTheDocument();
  expect(screen.getByRole('link', {name: /contact/i})).toBeInTheDocument();
  expect(screen.getByRole('link', {name: /about/i})).toBeInTheDocument();
})
