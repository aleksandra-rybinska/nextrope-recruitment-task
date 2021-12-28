import { useBooks } from '../AppContext';

const Homepage: React.FC = () => {
    const { books } = useBooks();
    console.log('books', books);

    return (
        <div>
            <h1>homepage</h1>
        </div>
    );
};

export default Homepage;
