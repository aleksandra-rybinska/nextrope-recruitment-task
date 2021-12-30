import { render, fireEvent, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import Cart from './pages/Cart';
import { AppProvider } from './AppContext';
import App from './App';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

describe(Cart.name, () => {
    render(
        <AppProvider>
            <Cart />
        </AppProvider>
    );

    it('should call correct action on add book to cart', () => {
        const addButton = screen.getByText('+');
        fireEvent.click(addButton);
    });

    it('should call correct action on remove book from cart', () => {
        const removeButton = screen.getByText('-');
        fireEvent.click(removeButton);
    });
});
