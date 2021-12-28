import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import Homepage from './pages/Homepage';
import Order from './pages/Order';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Homepage />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/order' element={<Order />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
