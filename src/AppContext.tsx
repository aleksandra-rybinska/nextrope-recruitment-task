import React, { createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import { BookType } from './types/index';
import { useLocalStorage } from './useLocalStorage';

const AppContext = createContext<any>({});

type AppProviderValue = {
    books?: BookType;
    status: string;
    cart: [] | BookType[];
    addToCart: (clickedBook: BookType) => void;
};

const getProducts = async (): Promise<{}> =>
    await (await fetch('http://localhost:3001/api/book')).json();

export const AppProvider = ({ children }: any) => {
    const { data, status } = useQuery<any>('products', getProducts);
    const books = data?.data;

    const [cart, setCart] = useLocalStorage('cart', [] as BookType[]);

    const addToCart = (clickedBook: BookType) => {
        setCart((prev) => {
            const isBookInCart = prev.find(
                (book) => book.id === clickedBook.id
            );
            if (isBookInCart) {
                return prev.map((book) =>
                    book.id === clickedBook.id
                        ? { ...book, amount: book.amount + 1 }
                        : book
                );
            }
            return [...prev, { ...clickedBook, amount: 1 }];
        });
    };

    const value: AppProviderValue = {
        books,
        status,
        cart,
        addToCart,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useBooks = () => {
    return useContext(AppContext);
};
