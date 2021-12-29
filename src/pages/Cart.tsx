import React from 'react';
import { Link } from 'react-router-dom';
import { useBooks } from '../AppContext';
import { BookType } from '../types';

const Cart: React.FC = () => {
    const { cart, addToCart, removeFromCart } = useBooks();

    return (
        <div>
            <div className='d-flex mt-2 align-items-center justify-content-between'>
                <h1 className='mx-4'>Koszyk</h1>
                <div className='mx-4'>
                    <Link to='/order' className='btn btn-primary mx-sm-2'>
                        DALEJ
                    </Link>
                    <Link to='/' className='btn btn-primary mx-sm-2'>
                        Strona główna
                    </Link>
                </div>
            </div>
            {cart.length === 0 && <h4 className='mx-4'>koszyk jest pusty</h4>}
            {cart.length > 0 &&
                cart.map((book: BookType) => (
                    <div className='row mx-4 my-4' key={book.id}>
                        <div className='card flex-md-row align-items-center'>
                            <img
                                style={{ maxHeight: 200, width: 'auto' }}
                                className='card-img-left mt-3'
                                alt={book.title}
                                src={book.cover_url}
                            />
                            <div className='card-body'>
                                <h5 className='card-title'>{book.title}</h5>
                                <p className='card-text'>
                                    autorzy: &nbsp;{book.author}
                                </p>
                                <p className='card-text'>
                                    liczba stron: &nbsp;{book.pages}
                                </p>
                                <h5>
                                    cena 1 szt.: &nbsp;
                                    {(book.price / 100).toFixed(2)}{' '}
                                    {book.currency}
                                </h5>
                            </div>
                            <div className='card-body mx-4 d-flex flex-column align-items-center'>
                                <p>ilość sztuk w koszyku:</p>
                                <div className='d-flex align-items-baseline gap-4'>
                                    <button
                                        className='btn btn-outline-secondary'
                                        onClick={() => removeFromCart(book.id)}>
                                        -
                                    </button>
                                    <h4>{book.amount}</h4>
                                    <button
                                        className='btn btn-outline-secondary'
                                        onClick={() => addToCart(book)}>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Cart;
