import React from 'react';
import { useBooks } from '../AppContext';
import { BookType } from '../types';

const Cart: React.FC = () => {
    const { cart } = useBooks();

    return (
        <div>
            <h1 className='mt-2 mx-4'>Koszyk</h1>
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
                                    <button className='btn btn-outline-secondary'>
                                        -
                                    </button>
                                    <h4>{book.amount}</h4>
                                    <button className='btn btn-outline-secondary'>
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
