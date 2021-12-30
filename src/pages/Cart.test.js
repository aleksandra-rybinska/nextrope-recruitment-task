import ReactDOM from 'react';
import { Cart } from './Cart';

test('renders cart correctly', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Cart></Cart>, div);
});
