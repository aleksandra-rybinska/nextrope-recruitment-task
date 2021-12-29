import { Link } from 'react-router-dom';
import { useBooks } from '../AppContext';
import { BookType } from '../types';

const Homepage: React.FC = () => {
    const { books, status, cart, addToCart } = useBooks();

    console.log('koszyk!!!!', cart);

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
                                    <p className='card-text'>{book.author}</p>
                                    <p className='card-text'>{book.pages}</p>
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
