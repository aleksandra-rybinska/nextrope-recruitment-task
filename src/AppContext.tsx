import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { BookType } from './types/index';
import { useLocalStorage } from './useLocalStorage';

type AppProviderValue = {
    books?: BookType[];
    status: string;
    cart: [] | BookType[];
    addToCart: (clickedBook: BookType) => void;
    removeFromCart: (id: number) => void;
};

const AppContext = createContext<any>({});

const getProducts = async (): Promise<{ data: BookType[] }> =>
    await (await fetch('http://localhost:3001/api/book')).json();

export const AppProvider: React.FC = ({ children }) => {
    const { data, status } = useQuery<{ data: BookType[] }, Error>(
        'products',
        getProducts
    );
    const books = data?.data;

    const [cart, setCart] = useLocalStorage<BookType[]>('cart', []);

    const addToCart = (clickedBook: BookType) => {
        setCart((prev) => {
            const isBookInCart = prev.find(
                (book) => book.id === clickedBook.id
            );
            if (isBookInCart) {
                return prev.map((book) =>
                    book.id === clickedBook.id
                        ? { ...book, quantity: book.quantity + 1 }
                        : book
                );
            }
            return [...prev, { ...clickedBook, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((old) =>
            old.reduce((acc, book) => {
                if (book.id === id) {
                    if (book.quantity === 1) return acc;
                    return [...acc, { ...book, quantity: book.quantity - 1 }];
                } else {
                    return [...acc, book];
                }
            }, [] as BookType[])
        );
    };

    const value: AppProviderValue = {
        books,
        status,
        cart,
        addToCart,
        removeFromCart,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useBooks = () => {
    return useContext(AppContext);
};
