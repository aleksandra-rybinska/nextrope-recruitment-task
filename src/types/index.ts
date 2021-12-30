export type BookType = {
    id: number;
    title: string;
    author: string;
    price: number;
    cover_url: string;
    pages: number;
    currency: string;
    quantity: number;
};

export type FormType = {
    firstName: string;
    lastName: string;
    city: string;
    zipCode: string;
}

export type ValidateConditionsType = 'firstName' | 'lastName' | 'city' | 'zipCode';
