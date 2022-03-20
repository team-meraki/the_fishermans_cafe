import { render, screen } from '@testing-library/react';
import NavBar from '../NavBar';

it('renders navbar', () => {
  render(<NavBar />);
  const navBarElement = screen.getByRole('navigation');
  expect(navBarElement).toBeInTheDocument();
});

it('renders nav links', () => {
    render(<NavBar />);
    const menuLinkElement = screen.getByRole('link', {  name: /menu/i})
    expect(menuLinkElement).toBeInTheDocument();
    const galleryLinkElement = screen.getByRole('link', {  name: /gallery/i})
    expect(galleryLinkElement).toBeInTheDocument();
    const contactLinkElement = screen.getByRole('link', {  name: /contact/i})
    expect(contactLinkElement).toBeInTheDocument();
    const aboutLinkElement = screen.getByRole('link', {  name: /about/i})
    expect(aboutLinkElement).toBeInTheDocument();
})
