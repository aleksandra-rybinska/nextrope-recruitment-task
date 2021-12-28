import { createContext, useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { BookType } from './types/index';

const AppContext = createContext<any>({});

type AppProviderValue = {
    books?: BookType;
    status: string;
};

const getProducts = async (): Promise<{}> =>
    await (await fetch('http://localhost:3001/api/book')).json();

export const AppProvider = ({ children }: any) => {
    const { data, status } = useQuery<any>('products', getProducts);
    const books = data?.data;

    const value: AppProviderValue = {
        books,
        status,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useBooks = () => {
    return useContext(AppContext);
};
