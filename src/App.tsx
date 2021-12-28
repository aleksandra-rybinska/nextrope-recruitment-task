import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import Homepage from './pages/Homepage';
import Order from './pages/Order';
import { AppProvider } from './AppContext';

function App() {
    return (
        <>
            <Router>
                <AppProvider>
                    <Routes>
                        <Route path='/' element={<Homepage />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/order' element={<Order />} />
                    </Routes>
                </AppProvider>
            </Router>
        </>
    );
}

export default App;
