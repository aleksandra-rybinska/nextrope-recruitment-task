import { Link } from 'react-router-dom';
const Order: React.FC = () => {
    return (
        <div>
            <div className='d-flex mt-2 align-items-center justify-content-between'>
                <h1 className='mx-4'>Podsumowanie</h1>
                <div className='mx-4'>
                    <Link to='/cart' className='btn btn-primary mx-sm-2'>
                        Koszyk
                    </Link>
                    <Link to='/' className='btn btn-primary mx-sm-2'>
                        Strona główna
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Order;
