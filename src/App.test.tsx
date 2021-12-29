import { render, fireEvent, screen } from '@testing-library/react';
import Cart from './pages/Cart';
import { AppProvider } from './AppContext';

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
