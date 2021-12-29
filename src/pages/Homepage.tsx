import { Link } from 'react-router-dom';
import { useBooks } from '../AppContext';
import { BookType } from '../types';

const Homepage: React.FC = () => {
    const { books, status, cart, addToCart } = useBooks();
    const getTotalItems = (books: BookType[]) =>
        books.reduce((ack: number, book) => ack + book.amount, 0);

    return (
        <div>
            {status === 'loading' && <div>Ładowanie danych...</div>}
            {status === 'error' && <div>Błąd pobierania danych</div>}
            <div className='d-flex mt-2 p-2 justify-content-between'>
                <h1 className='mx-4'>Strona główna</h1>
                <div>
                    <Link
                        to='/cart'
                        className='btn btn-primary position-relative mx-sm-4'>
                        Koszyk
                        {cart.length > 0 && (
                            <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                                {getTotalItems(cart)}
                                <span className='visually-hidden'>
                                    unread messages
                                </span>
                            </span>
                        )}
                    </Link>
                </div>
            </div>
            {status === 'success' && (
                <div className='row mx-3'>
                    {books.map((book: BookType) => (
                        <div className='col-md-6 col-lg-4 my-2' key={book.id}>
                            <div className='card flex-row'>
                                <img
                                    className='card-img-left w-25 h-25 mt-md-3'
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
                                    <button
                                        className='btn btn-secondary'
                                        onClick={() => addToCart(book)}>
                                        dodaj do koszyka
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Homepage;
