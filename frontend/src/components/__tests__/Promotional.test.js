import { render, screen } from '@testing-library/react';
import Promotional from '../Promotional';


it('renders promotional buttons', () => {
    render(<Promotional />);
    const prev = screen.getByRole('button', {  name: /previous/i});
    expect(prev).toBeInTheDocument();
    const order = screen.getAllByRole('button', {  name: /order/i});
    order.forEach(viewElement => {
        expect(viewElement).toBeInTheDocument();
    });
    const next = screen.getByRole('button', {  name: /next/i});
    expect(next).toBeInTheDocument();
})